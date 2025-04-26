"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Globe } from "lucide-react"

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  content: string
  link?: string
}

const ContactCard = ({ icon, title, content, link }: ContactCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-xl"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="relative z-10">
      <div className="mb-4 text-3xl text-blue-400">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-300">{content}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-400 hover:text-blue-300"
        >
          点击访问 →
        </a>
      )}
    </div>
  </motion.div>
)

export default function ContactMe() {
  return (
    <section id="contact" className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white">联系我</h2>
          <p className="text-gray-400">期待与您合作</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            icon={<Mail className="h-8 w-8" />}
            title="邮箱"
            content="jiayang@example.com"
            link="mailto:jiayang@example.com"
          />
          <ContactCard
            icon={<Phone className="h-8 w-8" />}
            title="电话"
            content="+86 123 4567 8900"
            link="tel:+8612345678900"
          />
          <ContactCard
            icon={<MapPin className="h-8 w-8" />}
            title="地址"
            content="上海市浦东新区"
          />
          <ContactCard
            icon={<Globe className="h-8 w-8" />}
            title="网站"
            content="www.jiayang.com"
            link="https://www.jiayang.com"
          />
        </div>
      </div>
    </section>
  )
} 