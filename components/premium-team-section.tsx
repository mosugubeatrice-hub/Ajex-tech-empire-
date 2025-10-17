"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter, Mail } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: "Isaac Ajeh",
    role: "Founder & CEO",
    bio: "Visionary leader with 10+ years of digital growth expertise. Isaac founded AJEx to revolutionize how brands approach digital transformation.",
    image: "/placeholder.svg?key=80qry",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "isaac@ajextechempire.com",
    },
  },
  {
    name: "Sarah Chen",
    role: "Chief Strategy Officer",
    bio: "Strategic mastermind behind our growth frameworks. Sarah leads our strategy team in crafting data-driven solutions for ambitious brands.",
    image: "/placeholder.svg?key=pdc5h",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sarah@ajextechempire.com",
    },
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Technology",
    bio: "Tech innovator passionate about building scalable digital solutions. Marcus ensures every project meets our premium quality standards.",
    image: "/placeholder.svg?key=f8ked",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "marcus@ajextechempire.com",
    },
  },
]

export function PremiumTeamSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Meet Our Leadership
          </h2>
          <p className="text-xl text-gray-300 text-pretty max-w-3xl mx-auto">
            Visionary leaders dedicated to transforming your digital presence into a growth engine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-500/50 overflow-hidden group transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm mb-4 text-pretty">{member.bio}</p>

                  <div className="flex items-center gap-3">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="p-2 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-blue-400" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="p-2 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
                      >
                        <Twitter className="w-4 h-4 text-blue-400" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="p-2 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-blue-400" />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
