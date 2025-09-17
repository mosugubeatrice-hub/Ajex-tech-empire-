import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechFlow SaaS",
      role: "CEO",
      content:
        "AJEx Tech Empire transformed our digital presence completely. Our organic traffic increased by 187% and we're generating 120+ qualified leads monthly. Their strategic approach is unmatched.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      company: "InnovateCorp",
      role: "Marketing Director",
      content:
        "The results speak for themselves - 300% increase in website speed, 250% boost in search rankings. The team's technical excellence and attention to detail exceeded our expectations.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      company: "GrowthTech Solutions",
      role: "Founder",
      content:
        "Working with AJEx Tech Empire was a game-changer. 400% increase in qualified leads and 60% reduction in cost per acquisition. They truly understand growth-focused businesses.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold mb-6 text-balance">What Our Clients Say</h2>
          <p className="text-xl font-inter text-muted-foreground text-pretty">Real results from real partnerships.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-secondary fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground font-inter mb-6 text-pretty">
                  "{testimonial.content}"
                </blockquote>
                <div>
                  <div className="font-montserrat font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
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
