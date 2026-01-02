export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    environment: 'production' | 'staging'
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    environment: 'production' | 'staging'
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    environment?: 'production' | 'staging'
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "projects_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            api_targets: {
                Row: {
                    id: string
                    project_id: string
                    base_url: string
                    auth_type: 'none' | 'api_key' | 'bearer'
                    auth_value: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    project_id: string
                    base_url: string
                    auth_type: 'none' | 'api_key' | 'bearer'
                    auth_value?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    project_id?: string
                    base_url?: string
                    auth_type?: 'none' | 'api_key' | 'bearer'
                    auth_value?: string | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "api_targets_project_id_fkey"
                        columns: ["project_id"]
                        isOneToOne: false
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    }
                ]
            }
            scans: {
                Row: {
                    id: string
                    project_id: string
                    api_target_id: string
                    status: 'pending' | 'running' | 'completed' | 'failed'
                    risk_score: number | null
                    created_at: string
                    completed_at: string | null
                }
                Insert: {
                    id?: string
                    project_id: string
                    api_target_id: string
                    status?: 'pending' | 'running' | 'completed' | 'failed'
                    risk_score?: number | null
                    created_at?: string
                    completed_at?: string | null
                }
                Update: {
                    id?: string
                    project_id?: string
                    api_target_id?: string
                    status?: 'pending' | 'running' | 'completed' | 'failed'
                    risk_score?: number | null
                    created_at?: string
                    completed_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "scans_api_target_id_fkey"
                        columns: ["api_target_id"]
                        isOneToOne: false
                        referencedRelation: "api_targets"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "scans_project_id_fkey"
                        columns: ["project_id"]
                        isOneToOne: false
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    }
                ]
            }
            scan_engines: {
                Row: {
                    id: string
                    scan_id: string
                    engine_name: 'metlo' | 'akto' | 'pentestgpt'
                    status: 'pending' | 'running' | 'completed' | 'failed'
                    runtime_ms: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    scan_id: string
                    engine_name: 'metlo' | 'akto' | 'pentestgpt'
                    status?: 'pending' | 'running' | 'completed' | 'failed'
                    runtime_ms?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    scan_id?: string
                    engine_name?: 'metlo' | 'akto' | 'pentestgpt'
                    status?: 'pending' | 'running' | 'completed' | 'failed'
                    runtime_ms?: number | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "scan_engines_scan_id_fkey"
                        columns: ["scan_id"]
                        isOneToOne: false
                        referencedRelation: "scans"
                        referencedColumns: ["id"]
                    }
                ]
            }
            issues: {
                Row: {
                    id: string
                    scan_id: string
                    engine: string
                    severity: 'critical' | 'high' | 'medium' | 'low'
                    title: string
                    description: string
                    endpoint: string
                    evidence: string
                    recommendation: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    scan_id: string
                    engine: string
                    severity: 'critical' | 'high' | 'medium' | 'low'
                    title: string
                    description: string
                    endpoint: string
                    evidence: string
                    recommendation: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    scan_id?: string
                    engine?: string
                    severity?: 'critical' | 'high' | 'medium' | 'low'
                    title?: string
                    description?: string
                    endpoint?: string
                    evidence?: string
                    recommendation?: string
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "issues_scan_id_fkey"
                        columns: ["scan_id"]
                        isOneToOne: false
                        referencedRelation: "scans"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

export type Project = Database['public']['Tables']['projects']['Row']
export type APITarget = Database['public']['Tables']['api_targets']['Row']
export type Scan = Database['public']['Tables']['scans']['Row']
export type ScanEngine = Database['public']['Tables']['scan_engines']['Row']
export type Issue = Database['public']['Tables']['issues']['Row']
