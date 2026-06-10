import { createClient } from "@/lib/supabase/server"

export interface Lead {
  id?: string
  email: string
  name: string
  company?: string
  phone?: string
  message: string
  service_interest?: string
  created_at?: string
}

export async function createLead(lead: Lead) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("leads").insert([
    {
      email: lead.email,
      name: lead.name,
      company: lead.company,
      phone: lead.phone,
      message: lead.message,
      service_interest: lead.service_interest,
      status: "new",
      created_at: new Date().toISOString(),
    },
  ])

  if (error) {
    console.error("Error creating lead:", error)
    throw new Error(error.message)
  }

  return data
}

export async function getLeads() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching leads:", error)
    throw new Error(error.message)
  }

  return data
}

export async function updateLeadStatus(id: string, status: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating lead:", error)
    throw new Error(error.message)
  }

  return data
}
