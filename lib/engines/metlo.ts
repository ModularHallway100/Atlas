export interface MetloOutput {
    findings: {
        id: string;
        title: string;
        description: string;
        endpoint: string;
        severity: string;
        recommendation: string;
        evidence: string;
    }[];
}

export const runMetlo = async (targetUrl: string): Promise<MetloOutput> => {
    const findings: MetloOutput["findings"] = [];
    
    try {
        const response = await fetch(targetUrl, {
            method: 'HEAD',
            redirect: 'follow',
        });

        const headers = response.headers;

        // 1. Check for HSTS
        if (!headers.get('strict-transport-security')) {
            findings.push({
                id: "metlo-hsts-missing",
                title: "Missing Strict-Transport-Security (HSTS)",
                description: "The HSTS header is missing, which allows attackers to downgrade the connection to HTTP.",
                endpoint: targetUrl,
                severity: "MEDIUM",
                recommendation: "Add 'Strict-Transport-Security: max-age=31536000; includeSubDomains' to all responses.",
                evidence: "No HSTS header found in response headers."
            });
        }

        // 2. Check for CSP
        if (!headers.get('content-security-policy')) {
            findings.push({
                id: "metlo-csp-missing",
                title: "Missing Content-Security-Policy (CSP)",
                description: "A missing CSP header makes the application vulnerable to Cross-Site Scripting (XSS) and data injection attacks.",
                endpoint: targetUrl,
                severity: "HIGH",
                recommendation: "Implement a restrictive CSP header to control which resources can be loaded.",
                evidence: "No CSP header found in response headers."
            });
        }

        // 3. Check for X-Frame-Options
        if (!headers.get('x-frame-options')) {
            findings.push({
                id: "metlo-xfo-missing",
                title: "Missing X-Frame-Options",
                description: "Lack of X-Frame-Options allows the site to be embedded in an iframe, enabling clickjacking attacks.",
                endpoint: targetUrl,
                severity: "LOW",
                recommendation: "Set 'X-Frame-Options: DENY' or 'SAMEORIGIN'.",
                evidence: "No X-Frame-Options header found in response."
            });
        }

    } catch (error) {
        console.error("Metlo engine failed to fetch:", error);
    }

    return { findings };
};
