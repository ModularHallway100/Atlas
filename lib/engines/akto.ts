export interface AktoOutput {
    vulnerabilities: {
        vulnId: string;
        name: string;
        desc: string;
        url: string;
        severityLabel: string;
        details: string;
        fix: string;
    }[];
}

export const runAkto = async (targetUrl: string): Promise<AktoOutput> => {
    const vulnerabilities: AktoOutput["vulnerabilities"] = [];

    // Payloads to test for basic injection/mirroring
    const payloads = [
        { name: "SQLi Tautology", payload: "' OR 1=1--" },
        { name: "XSS Script", payload: "<script>alert(1)</script>" },
        { name: "Path Traversal", payload: "../../../etc/passwd" }
    ];

    try {
        for (const p of payloads) {
            const testUrl = new URL(targetUrl);
            testUrl.searchParams.append('q', p.payload);
            testUrl.searchParams.append('id', p.payload);

            const response = await fetch(testUrl.toString(), {
                method: 'GET',
                redirect: 'follow',
            });

            // Analyze response for indicators of vulnerability
            if (response.status === 500) {
                vulnerabilities.push({
                    vulnId: `akto-500-${p.name.toLowerCase().replace(/\s+/g, '-')}`,
                    name: `Potential ${p.name} Vulnerability`,
                    desc: `The server returned a 500 Internal Server Error when injected with a ${p.name} payload. This often indicates unhandled exceptions or database errors.`,
                    url: testUrl.toString(),
                    severityLabel: "HIGH",
                    details: `Payload: ${p.payload}. Response status: 500. This suggests the input caused a backend crash or database error.`,
                    fix: "Implement robust input validation and error masking. Never expose raw stack traces or database errors."
                });
            }

            const body = await response.text();
            if (body.includes(p.payload)) {
                vulnerabilities.push({
                    vulnId: `akto-reflect-${p.name.toLowerCase().replace(/\s+/g, '-')}`,
                    name: `Reflected Input (${p.name})`,
                    desc: `The application reflects the ${p.name} payload directly in the response body without sanitization.`,
                    url: testUrl.toString(),
                    severityLabel: p.name === 'XSS Script' ? "CRITICAL" : "MEDIUM",
                    details: `The payload "${p.payload}" was found mirrored in the response. This is a primary indicator of XSS or injection flaws.`,
                    fix: "Sanitize all user-controlled input before reflecting it in responses. Use output encoding and a strong CSP."
                });
            }
        }
    } catch (error) {
        console.error("Akto engine failed to fuzz:", error);
    }

    return { vulnerabilities };
};
