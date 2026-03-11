import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Zap,
  Sun,
  Building2,
  Target,
  TrendingUp,
  Lightbulb,
  Award,
  Calendar,
  MapPin,
  Mail,
  Linkedin,
  Monitor,
  Wrench,
  Cpu,
  BarChart3,
  Code,
  GraduationCap,
  Briefcase,
  Wind,
  Waves,
  Atom,
  Thermometer,
  Leaf,
  Download,
  BookOpen,
  Star,
  Brain,
  Factory,
  Building,
  Globe,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState, useEffect } from "react";
import irisProfile from "@/assets/iris-profile.jpg";
import solarPanel from "@/assets/solar-panel.png";
import solarHouse from "@/assets/solar-house.png";
import solarInstallation from "@/assets/solar-installation.jpg";
import ecopowerHouse1 from "@/assets/ecopower-house-1.png";
import ecopowerHouse3 from "@/assets/ecopower-house-3.png";
import ecopowerHouse4 from "@/assets/ecopower-house-4.png";
import { motion } from "framer-motion";
import empresarialImg from '@/assets/EMPRESARIAL.png';
import ruralImg from '@/assets/RURAL.png';
import industrialImg from '@/assets/INDUSTRIAL.png';
import subestacaoImg from '@/assets/subestação.png';
import soloImg from '@/assets/solo.png';
import industriaImg from '@/assets/industria.png';
import capaImg from '@/assets/capa.png';
import gestaoAgil from '@/assets/gestao-agil.png';
import python from '@/assets/python.png';
import rpa from '@/assets/rpa.png';
import powerBI from '@/assets/powerBI.png';
import ia from '@/assets/ia.png';
import gestaoEstrategica from '@/assets/gestao-estrategica.png';
import gestaoPessoas from '@/assets/gestao-pessoas.png';
import gestaoProcesso from '@/assets/gestao-processo.png';


const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Typewriter effect
  const roles = [
    "Liderança em Engenharia de Energia",
    "Especialista em Inteligência Artificial",
    "Especialista em Smart Cities",
    "Especialista em BIM e Gestão de Obras",
    "Especialista em Automação Industrial",
    "Inovação Sustentável & Tecnologia"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = roles[roleIndex];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Se for a seção "about", direcionar especificamente para "sobre-mim"
    const targetId = sectionId === "about" ? "sobre-mim" : sectionId;
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerHeight = 80; // Altura aproximada do header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Validar campos obrigatórios
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Por favor, preencha todos os campos');
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Por favor, insira um email válido');
      }

      // Opção 1: Enviar via WhatsApp (principal)
      const message = encodeURIComponent(
        `*Nova mensagem do portfólio*\n\n` +
        `*Nome:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Assunto:* ${formData.subject}\n\n` +
        `*Mensagem:*\n${formData.message}`
      );
      
      window.open(`https://wa.me/5553999004179?text=${message}`, '_blank');
      
      // Opção 2: Armazenar via Formspree (backup)
      try {
        const formspreeResponse = await fetch('https://formspree.io/f/xldlwzjw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _subject: `Nova mensagem do portfólio: ${formData.subject}`
          })
        });
        
        if (!formspreeResponse.ok) {
          console.warn('Erro ao enviar para Formspree, mas WhatsApp foi enviado');
        }
      } catch (error) {
        console.warn('Erro ao enviar para Formspree:', error);
        // Continua mesmo se Formspree falhar, pois WhatsApp já foi enviado
      }
      
      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setSubmitStatus('success');
      
      // Resetar status após 3 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      console.error('Erro ao enviar mensagem:', error);
      
      // Resetar status após 3 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const experienceData = [
    {
      company: "EcoPower Energia Solar",
      position: "Supervisor de Engenharia",
      period: "2023-Atual",
      location: "São Paulo, SP",
      achievements: [
        "Liderança de equipe de 49 colaboradores diretos",
        "Aumento de 141.4% de melhoria de performance em um ano de trabalho",
        "Implementação de soluções inovadoras em toda esteira de produção e entrega",
        "Gestão de P&L e planejamento estratégico",
        "Gestão de projetos de energia sustentável" 
      ]
    },
    {
      company: "Solarium Energia",
      position: "Gerente de Operações",
      period: "2022 - 2024",
      location: "Anápolis, GO",
      achievements: [
        "Desenvolvimento de projetos fotovoltaicos residenciais e comerciais",
        "Estudos de viabilidade técnica e econômica",
        "Coordenação de instalações e comissionamento"
      ]
    },
    {
      company: "Pro-W Engenharia",
      position: "Gerente geral",
      period: "2020 - 2022",
      location: "Anápolis, GO",
      achievements: [
        "Projetos de subestações de energia",
        "Estudos de proteção e seletividade",
        "Automação industrial",
        "Desenvolvimento de projetos elétricos industriais"
      ]
    }
  ];

  const performanceData = [
    { metric: "Média de Projetos", value2023: "919,5", value2024: "2219,5", growth: "+141,4%" },
    { metric: "Média de Colaboradores", value2023: "32", value2024: "43", growth: "+34,4%" },
  ];

  const certifications = [
    { name: "AutoCAD 2D", icon: Monitor },
    { name: "MS Project", icon: Calendar },
    { name: "PVsyst", icon: Sun },
    { name: "Simares", icon: Zap },
    { name: "DIALux", icon: Lightbulb },
    { name: "Revit", icon: Building2 },
    { name: "Power BI", icon: BarChart3 },
    { name: "Python", icon: Code },
    { name: "Estudos de Proteção", icon: Wrench },
    { name: "Projetista de Subestação", icon: Cpu }
  ];

  const posGraduacoes = [
    {
      titulo: "Inteligência Artificial",
      instituicao: "Faculdade Iguaçu",
      periodo: "Set 2024 – Out 2025",
      carga: "640 H/A",
      tcc: "Levando IA para Produção: Desafios e Estratégias de Implementação",
      nota: 93,
      area: "Computação e Tecnologias da Informação e Comunicação (TIC)",
      icon: Brain,
      gradient: "from-violet-500 via-purple-500 to-indigo-600",
      glow: "shadow-purple-500/30",
      badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
      highlights: ["Deep Learning", "Reinforcement Learning", "Engenharia de Software para IA", "Matemática para IA"],
      registro: "Nº 47422"
    },
    {
      titulo: "BIM em Gerenciamento de Projetos e Qualidade de Obras",
      instituicao: "Faculdade Iguaçu",
      periodo: "Set 2024 – Set 2025",
      carga: "720 H/A",
      tcc: "Aplicações de BIM na Gestão de Projetos de Construção Civil",
      nota: 96,
      area: "Engenharia, Produção e Construção",
      icon: Building,
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      glow: "shadow-emerald-500/30",
      badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      highlights: ["BIM Modelagem 4D", "Gerenciamento de Escopo", "Gestão de Riscos", "Ferramenta BIM em Projetos"],
      registro: "Nº 39588"
    },
    {
      titulo: "Automação Industrial",
      instituicao: "Faculdade Iguaçu",
      periodo: "Set 2024 – Set 2025",
      carga: "720 H/A",
      tcc: "Redes de Comunicação de Dados em Ambientes Industriais",
      nota: 94,
      area: "Engenharia, Produção e Construção",
      icon: Factory,
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      glow: "shadow-orange-500/30",
      badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
      highlights: ["Internet das Coisas (IoT)", "Robótica Industrial", "Sistemas Embarcados", "Instrumentação Industrial"],
      registro: "Nº 39587"
    },
    {
      titulo: "Cidades Inteligentes – Smart Cities",
      instituicao: "Faculdade Iguaçu",
      periodo: "Set 2024 – Nov 2025",
      carga: "720 H/A",
      tcc: "Planejamento Energético e Fontes Alternativas de Energia em Smart Cities",
      nota: 95,
      area: "Engenharia, Produção e Construção",
      icon: Globe,
      gradient: "from-blue-500 via-cyan-500 to-sky-600",
      glow: "shadow-blue-500/30",
      badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      highlights: ["Mobilidade Sustentável", "Planejamento Energético", "Tecnologia BIM", "Governança Pública"],
      registro: "Nº 56078"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation Header */}
      <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-extrabold text-2xl md:text-3xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
              Iris Roberto
            </span>
          </motion.div>
          <nav className="hidden md:flex gap-8">
            {[
              { id: "home", label: "Home" },
              { id: "posgraduacao", label: "Formação" },
              { id: "sobre-mim", label: "Sobre" },
              { id: "experience", label: "Experiência" },
              { id: "performance", label: "Performance" },
              { id: "certifications", label: "Certificações" },
              { id: "contact", label: "Contato" }
            ].map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-base font-semibold tracking-wide transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-primary/20 hover:to-blue-600/20 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 relative overflow-hidden ${
                  activeSection === item.id ? "text-primary bg-gradient-to-r from-primary/10 to-blue-600/10" : "text-muted-foreground"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-blue-600"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </header>

      {/* Botão de Download de Currículo */}
      <motion.div 
        className="w-full flex justify-center bg-background pt-24 pb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.a
          href="/curriculo-iris-roberto.pdf"
          download="Curriculo-Iris-Roberto-Ferreira.pdf"
          aria-label="Baixar currículo de Iris Roberto dos Santos Ferreira"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white font-bold shadow-xl text-lg hover:shadow-primary/30 hover:shadow-2xl border border-primary/20 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <Download className="w-5 h-5" aria-hidden="true" />
          Baixar Currículo
        </motion.a>
      </motion.div>

      <main className="pt-16">
        {/* Bloco de Capa e Foto de Perfil no Topo */}
        <motion.section 
          id="home"
          className="relative w-full flex flex-col items-center justify-center min-h-[340px] md:min-h-[420px] bg-gradient-to-b from-background to-secondary/10 border-b border-border overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Elementos flutuantes de fundo */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          <motion.img 
            src={capaImg} 
            alt="Capa visual do portfólio" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-80" 
            style={{zIndex:1}}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          
          <div className="relative z-10 flex flex-col items-center justify-center pt-10 md:pt-16">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Avatar className="w-40 h-40 md:w-48 md:h-48 ring-4 ring-white/40 shadow-2xl mb-4 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-blue-600/20 animate-pulse" />
                <AvatarImage src="/iris-avatar.png" alt="Iris Roberto dos Santos Ferreira" />
                <AvatarFallback className="text-2xl bg-white/20">IR</AvatarFallback>
              </Avatar>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-2 text-center bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Iris Roberto dos Santos Ferreira
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-white/90 drop-shadow mb-4 text-center min-h-[2rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <span className="typewriter-cursor">{displayed}</span>
            </motion.p>
            {/* Badges das especializações no hero */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mt-2 mb-4 px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {["Esp. IA", "Esp. Smart Cities", "Esp. BIM", "Esp. Automação Industrial"].map((tag) => (
                <span key={tag} className="bg-white/20 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-white/30 font-medium">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ═══ PÓS-GRADUAÇÕES ═══ */}
        <motion.section
          id="posgraduacao"
          className="py-20 px-6 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background decorativo */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/10 to-background pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />

          <div className="container mx-auto max-w-7xl relative">
            {/* Título */}
            <div className="text-center mb-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-primary/20"
              >
                <GraduationCap className="w-4 h-4" />
                Faculdade Iguaçu — Pós-Graduação Lato Sensu
              </motion.div>
              <motion.h2
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Formação Especializada
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                4 especializações concluídas simultaneamente em 2024-2025, consolidando expertise multidisciplinar em tecnologia, engenharia e inovação.
              </motion.p>
              {/* Stats resumo */}
              <motion.div
                className="flex flex-wrap justify-center gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {[
                  { label: "Especializações", value: "4" },
                  { label: "Horas Acadêmicas", value: "2.800+" },
                  { label: "Nota média TCC", value: "94,5" },
                  { label: "Frequência", value: "100%" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center bg-background/80 backdrop-blur border border-border/60 rounded-xl px-6 py-3 shadow-sm">
                    <p className="text-2xl font-extrabold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Cards das Pós-Graduações */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {posGraduacoes.map((pg, index) => (
                <motion.div
                  key={pg.titulo}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className={`group relative bg-background rounded-2xl border border-border/60 overflow-hidden shadow-lg hover:shadow-2xl hover:${pg.glow} transition-all duration-400`}
                >
                  {/* Topo colorido */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${pg.gradient}`} />

                  <div className="p-7">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pg.gradient} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <pg.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg leading-tight text-foreground mb-1">{pg.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{pg.instituicao} · {pg.area.split(" e ")[0]}</p>
                      </div>
                      {/* Nota TCC badge */}
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="relative">
                          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${pg.gradient} flex items-center justify-center shadow-md`}>
                            <span className="text-white font-extrabold text-xl">{pg.nota}</span>
                          </div>
                          <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow" />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 text-center">nota TCC</p>
                      </div>
                    </div>

                    {/* Infos */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/60 rounded-lg px-2.5 py-1">
                        <Calendar className="w-3 h-3" />{pg.periodo}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/60 rounded-lg px-2.5 py-1">
                        <BookOpen className="w-3 h-3" />{pg.carga}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/60 rounded-lg px-2.5 py-1">
                        <Award className="w-3 h-3" />Reg. {pg.registro}
                      </span>
                    </div>

                    {/* TCC */}
                    <div className={`rounded-xl p-3.5 mb-4 border ${pg.badge.includes('purple') ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' : pg.badge.includes('emerald') ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : pg.badge.includes('orange') ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' : 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'}`}>
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Trabalho de Conclusão de Curso</p>
                      <p className="text-sm font-medium text-foreground leading-snug">"{pg.tcc}"</p>
                    </div>

                    {/* Disciplinas em destaque */}
                    <div>
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Disciplinas em Destaque</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pg.highlights.map((h) => (
                          <span key={h} className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${pg.badge}`}>
                            <CheckCircle2 className="w-3 h-3" />{h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Especialista badge */}
                    <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-primary">Título: Especialista</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Freq. 100%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-muted-foreground text-sm">
                Todos os certificados emitidos pela <strong>Faculdade Iguaçu</strong> em conformidade com a <strong>Resolução CNE/CES nº 1 de 06/04/2018</strong>
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Depoimentos */}
        <motion.section
          className="w-full flex justify-center bg-background py-12 border-b border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-5xl w-full px-4">
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-center text-primary mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Depoimentos
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[{
                nome: "Ana Paula",
                cargo: "Gerente de Compras, Pro-W Engenharia",
                texto: "Trabalhar com Iris foi uma experiência transformadora. Sua liderança e visão estratégica elevaram o desempenho da equipe a outro nível."
              }, {
                nome: "Deyvid Emidio",
                cargo: "Lider da equipe de projetos, EcoPower",
                texto: "Profissional dedicado, inovador e com grande capacidade de gestão. Iris entrega resultados acima do esperado."
              }, {
                nome: "Anaelson Rodrigues",
                cargo: "CEO, Solarium Energia",
                texto: "Além do conhecimento técnico, Iris se destaca pela empatia e habilidade de motivar pessoas. Recomendo fortemente!"
              }].map((dep, i) => (
                <motion.div
                  key={dep.nome}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white dark:bg-accent/30 rounded-xl shadow-md p-6 border border-primary/10 flex flex-col items-center backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
                >
                  <motion.span 
                    className="font-semibold text-lg text-primary mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.15 + 0.3 }}
                  >
                    {dep.nome}
                  </motion.span>
                  <motion.span 
                    className="text-xs text-muted-foreground mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.15 + 0.4 }}
                  >
                    {dep.cargo}
                  </motion.span>
                  <motion.p 
                    className="text-sm text-foreground italic text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.15 + 0.5 }}
                  >
                    "{dep.texto}"
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* What is Energy Engineering Section */}
        <motion.section 
          id="about"
          className="py-20 px-6 bg-gradient-to-br from-background to-accent/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto max-w-6xl">
            <motion.h2 
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              O que é Engenharia de Energia?
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="shadow-[var(--shadow-elegant)] mb-12 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <h3 className="text-2xl font-bold mb-4 text-primary">Uma Especialização Única</h3>
                      <p className="text-lg leading-relaxed mb-4">
                        A <strong>Engenharia de Energia</strong> é uma formação especializada e ainda pouco conhecida no Brasil, 
                        que capacita profissionais para dominar todas as modalidades de geração de energia elétrica.
                      </p>
                      <p className="text-lg leading-relaxed">
                        Diferente de outras engenharias tradicionais, esta área abrange um conhecimento integrado e 
                        multidisciplinar, desde sistemas fotovoltáicos até as mais avançadas tecnologias energéticas.
                      </p>
                    </motion.div>
                    <motion.div 
                      className="grid grid-cols-2 gap-4"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      {[
                        { icon: Sun, label: "Solar", gradient: "from-yellow-400 to-orange-500" },
                        { icon: Atom, label: "Nuclear", gradient: "from-green-400 to-blue-500" },
                        { icon: Wind, label: "Eólica", gradient: "from-blue-400 to-cyan-500" },
                        { icon: Waves, label: "Hidrelétrica", gradient: "from-blue-500 to-purple-500" },
                        { icon: Waves, label: "Maremotriz", gradient: "from-cyan-400 to-blue-500" },
                        { icon: Thermometer, label: "Geotérmica", gradient: "from-red-400 to-orange-500" },
                        { icon: Leaf, label: "Biomassa", gradient: "from-green-400 to-emerald-500" },
                        { icon: Zap, label: "Termelétrica", gradient: "from-purple-400 to-pink-500" }
                      ].map((item, index) => (
                        <motion.div 
                          key={item.label}
                          className="text-center p-4 bg-muted/30 rounded-lg backdrop-blur-sm hover:bg-muted/50 transition-all duration-300 group"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <div className={`w-8 h-8 mx-auto mb-2 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center group-hover:animate-pulse`}>
                            <item.icon className="h-4 w-4 text-white" />
                          </div>
                          <p className="font-semibold text-sm">{item.label}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Tipos de Energia Renovável - Interactive Section */}
            <motion.h3 
              className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Tipos de Energia Renovável
            </motion.h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all cursor-pointer border-orange-200 hover:border-orange-400 backdrop-blur-sm">
                      <CardHeader>
                        <motion.div 
                          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Sun className="h-8 w-8 text-white" />
                        </motion.div>
                        <CardTitle className="text-lg">Energia Solar Fotovoltáica</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Conversão direta da luz solar em eletricidade através do efeito fotovoltáico...</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl">
                      <Sun className="mr-3 h-8 w-8 text-yellow-500" />
                      Energia Solar Fotovoltaica
                    </DialogTitle>
                    <DialogDescription>
                      Conversão direta da luz solar em eletricidade através do efeito fotovoltáico. Sistemas on-grid, off-grid e híbridos.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Fórmula Principal */}
                    <div className="bg-muted/30 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3 text-primary">Fórmula Principal</h4>
                      <div className="bg-background p-4 rounded border text-center mb-4">
                        <div className="text-lg font-mono">P = A × η × G</div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li><strong>P</strong> = Potência gerada (W)</li>
                            <li><strong>A</strong> = Área do painel (m²)</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li><strong>η</strong> = Eficiência do painel (decimal)</li>
                            <li><strong>G</strong> = Irradiância solar (W/m²)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Exemplo Prático */}
                    <div className="bg-primary/5 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3">Exemplo de Aplicação</h4>
                      <p className="text-sm mb-3">
                        Um painel de <strong>2 m²</strong> com eficiência de <strong>18%</strong> sob irradiância de <strong>800 W/m²</strong>:
                      </p>
                      <div className="bg-background p-3 rounded border text-center mb-3">
                        <div className="font-mono">P = 2 × 0,18 × 800 = 288 W</div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-2">Especificações Técnicas</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Potência típica:</strong> 300W a 700W por painel</li>
                            <li>• <strong>Eficiência:</strong> 18% a 23% (silício monocristalino)</li>
                            <li>• <strong>Vida útil:</strong> 25+ anos com garantia</li>
                            <li>• <strong>Degradação:</strong> ~0,5% ao ano</li>
                          </ul>
                        </div>
                        <div>
                          <img src={solarPanel} alt="Painel Solar" className="w-full rounded-lg shadow-md" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Tipos de Sistemas */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Tipos de Sistemas</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold">On-Grid</h5>
                          <p className="text-sm">Conectado à rede elétrica com compensação de energia</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold">Off-Grid</h5>
                          <p className="text-sm">Sistema isolado com baterias para armazenamento</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold">Híbrido</h5>
                          <p className="text-sm">Combinação de conexão à rede e backup com baterias</p>
                        </div>
                      </div>
                    </div>

                    {/* Fatores que Afetam a Geração */}
                    <div className="bg-secondary/10 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">💡 Fatores que Impactam a Eficiência</h5>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <ul className="space-y-1">
                          <li>• Inclinação e orientação do painel</li>
                          <li>• Localização geográfica</li>
                          <li>• Temperatura ambiente</li>
                        </ul>
                        <ul className="space-y-1">
                          <li>• Sombreamento parcial</li>
                          <li>• Sujeira e manutenção</li>
                          <li>• Idade do equipamento</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Card className="text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all cursor-pointer hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Wind className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">Energia Eólica</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Aproveitamento da energia cinética dos ventos através de aerogeradores...</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl">
                      <Wind className="mr-3 h-8 w-8 text-blue-500" />
                      Energia Eólica
                    </DialogTitle>
                    <DialogDescription>
                      Aproveitamento da energia cinética dos ventos através de aerogeradores para produção de eletricidade.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Fórmula Principal */}
                    <div className="bg-muted/30 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3 text-primary">Fórmula Principal (Potência do Vento)</h4>
                      <div className="bg-background p-4 rounded border text-center mb-4">
                        <div className="text-lg font-mono">P = ½ × ρ × A × v³ × C<sub>p</sub></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li><strong>P</strong> = Potência mecânica (W)</li>
                            <li><strong>ρ</strong> = Densidade do ar (~1,225 kg/m³)</li>
                            <li><strong>A</strong> = Área varrida (π × raio²)</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li><strong>v</strong> = Velocidade do vento (m/s)</li>
                            <li><strong>C<sub>p</sub></strong> = Coeficiente de potência</li>
                            <li><em>Máx. teórico = 0,59 (Limite de Betz)</em></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Exemplo Prático */}
                    <div className="bg-primary/5 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3">Exemplo de Aplicação</h4>
                      <p className="text-sm mb-3">
                        Turbina com pás de <strong>10 m de raio</strong>, vento a <strong>12 m/s</strong> e <strong>C<sub>p</sub> = 0,4</strong>:
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="bg-background p-3 rounded border text-center">
                          <div className="font-mono text-sm">A = π × 10² = 314 m²</div>
                        </div>
                        <div className="bg-background p-3 rounded border text-center">
                          <div className="font-mono text-sm">P = 0,5 × 1,225 × 314 × 12³ × 0,4 ≈ 1,3 MW</div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Componentes Principais</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Rotor:</strong> 3 pás aerodinâmicas</li>
                            <li>• <strong>Nacele:</strong> Caixa de engrenagens</li>
                            <li>• <strong>Gerador:</strong> Conversão mecânica/elétrica</li>
                            <li>• <strong>Torre:</strong> 80-150m de altura</li>
                            <li>• <strong>Transformador:</strong> Elevação de tensão</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Especificações Típicas</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Potência:</strong> 1,5MW a 15MW</li>
                            <li>• <strong>Velocidade mínima:</strong> 3-4 m/s</li>
                            <li>• <strong>Velocidade nominal:</strong> 12-15 m/s</li>
                            <li>• <strong>Diâmetro do rotor:</strong> 90-220m</li>
                            <li>• <strong>Fator de capacidade:</strong> 25-45%</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Fatores Críticos */}
                    <div className="bg-secondary/10 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">🌪️ Fatores que Impactam a Geração</h5>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <ul className="space-y-1">
                          <li>• <strong>Altura da torre:</strong> Vento mais constante</li>
                          <li>• <strong>Perfil do vento:</strong> Velocidade cúbica</li>
                          <li>• <strong>Rugosidade do terreno:</strong> Obstáculos</li>
                        </ul>
                        <ul className="space-y-1">
                          <li>• <strong>Densidade do ar:</strong> Altitude e temperatura</li>
                          <li>• <strong>Direção do vento:</strong> Orientação das pás</li>
                          <li>• <strong>Manutenção:</strong> Eficiência dos componentes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Card className="text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all cursor-pointer hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center">
                        <Waves className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">Energia Hidrelétrica</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Geração através do aproveitamento do potencial hidráulico de rios...</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl">
                      <Waves className="mr-3 h-8 w-8 text-blue-600" />
                      Energia Hidrelétrica
                    </DialogTitle>
                    <DialogDescription>
                      Geração através do aproveitamento do potencial hidráulico de rios e quedas d'água.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Fórmula Principal */}
                    <div className="bg-muted/30 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3 text-primary">Fórmula Principal (Potência Hidráulica)</h4>
                      <div className="bg-background p-4 rounded border text-center mb-4">
                        <div className="text-lg font-mono">P = ρ × g × Q × H × η</div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li><strong>P</strong> = Potência gerada (W)</li>
                            <li><strong>ρ</strong> = Densidade da água (1000 kg/m³)</li>
                            <li><strong>g</strong> = Aceleração gravitacional (9,81 m/s²)</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li><strong>Q</strong> = Vazão volumétrica (m³/s)</li>
                            <li><strong>H</strong> = Altura de queda (m)</li>
                            <li><strong>η</strong> = Eficiência da turbina (0,8 a 0,95)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Exemplo Prático */}
                    <div className="bg-primary/5 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3">Exemplo de Aplicação</h4>
                      <p className="text-sm mb-3">
                        Usina com vazão de <strong>50 m³/s</strong>, queda de <strong>20 m</strong> e eficiência de <strong>85%</strong>:
                      </p>
                      <div className="bg-background p-3 rounded border text-center mb-4">
                        <div className="font-mono">P = 1000 × 9,81 × 50 × 20 × 0,85 ≈ 8,34 MW</div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold">PCHs</h5>
                          <p className="text-sm">Pequenas Centrais Hidrelétricas: 5-30MW</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold">CGHs</h5>
                          <p className="text-sm">Centrais Geradoras Hidrelétricas: até 5MW</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold">UHEs</h5>
                          <p className="text-sm">Usinas Hidrelétricas: acima de 30MW</p>
                        </div>
                      </div>
                    </div>

                    {/* Tipos de Turbinas */}
                    <div className="bg-secondary/10 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-3">Tipos de Turbinas e Aplicações</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg bg-background">
                          <h5 className="font-semibold text-primary">Turbina Pelton</h5>
                          <ul className="text-sm space-y-1 mt-2">
                            <li>• <strong>Queda:</strong> Alta (&gt;200m)</li>
                            <li>• <strong>Vazão:</strong> Baixa</li>
                            <li>• <strong>Tipo:</strong> Impulso</li>
                            <li>• <strong>Aplicação:</strong> Montanhas</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg bg-background">
                          <h5 className="font-semibold text-primary">Turbina Francis</h5>
                          <ul className="text-sm space-y-1 mt-2">
                            <li>• <strong>Queda:</strong> Média (10-400m)</li>
                            <li>• <strong>Vazão:</strong> Média a alta</li>
                            <li>• <strong>Tipo:</strong> Reação</li>
                            <li>• <strong>Aplicação:</strong> Mais comum</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg bg-background">
                          <h5 className="font-semibold text-primary">Turbina Kaplan</h5>
                          <ul className="text-sm space-y-1 mt-2">
                            <li>• <strong>Queda:</strong> Baixa (&lt;40m)</li>
                            <li>• <strong>Vazão:</strong> Muito alta</li>
                            <li>• <strong>Tipo:</strong> Reação axial</li>
                            <li>• <strong>Aplicação:</strong> Rios planálticos</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-primary/10 rounded text-sm">
                        <strong>💡 Dica:</strong> A escolha da turbina depende principalmente da relação entre altura de queda e vazão disponível no local.
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Card className="text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all cursor-pointer hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-600 to-yellow-500 rounded-full flex items-center justify-center">
                        <Atom className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">Energia Nuclear</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Fissão nuclear controlada em reatores para geração de energia térmica...</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl">
                      <Atom className="mr-3 h-8 w-8 text-green-600" />
                      Energia Nuclear
                    </DialogTitle>
                    <DialogDescription>
                      Fissão nuclear controlada em reatores para geração de energia térmica convertida em eletricidade.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Fórmula Principal */}
                    <div className="bg-muted/30 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3 text-primary">Fórmula Principal (Energia da Fissão)</h4>
                      <div className="bg-background p-4 rounded border text-center mb-4">
                        <div className="text-lg font-mono">E = Δm × c²</div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li><strong>E</strong> = Energia liberada (Joules)</li>
                            <li><strong>Δm</strong> = Defeito de massa (kg)</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li><strong>c</strong> = Velocidade da luz (3×10⁸ m/s)</li>
                            <li><em>Equação de Einstein (E=mc²)</em></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Exemplo Prático */}
                    <div className="bg-primary/5 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3">Exemplo de Aplicação</h4>
                      <p className="text-sm mb-3">
                        <strong>1 kg de Urânio-235</strong> em fissão nuclear:
                      </p>
                      <div className="bg-background p-3 rounded border text-center mb-4">
                        <div className="font-mono text-sm">E ≈ 8,2×10¹³ J</div>
                        <div className="text-xs mt-1 text-muted-foreground">Equivalente a ~3.000 toneladas de carvão</div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Características da Usina</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Potência típica:</strong> 1.000-1.600MW</li>
                            <li>• <strong>Fator de capacidade:</strong> 85-95%</li>
                            <li>• <strong>Vida útil:</strong> 40-80 anos</li>
                            <li>• <strong>Combustível:</strong> Urânio enriquecido a 3-5%</li>
                            <li>• <strong>Eficiência térmica:</strong> 33-35%</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Sistemas de Segurança</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• Múltiplas barreiras de contenção</li>
                            <li>• Sistemas de resfriamento redundantes</li>
                            <li>• Monitoramento 24/7</li>
                            <li>• Protocolos rígidos de segurança</li>
                            <li>• Barras de controle para parada emergencial</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Tipos de Reatores */}
                    <div className="bg-secondary/10 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-3">Tipos de Reatores</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg bg-background">
                          <h5 className="font-semibold text-primary">PWR (Pressurized Water Reactor)</h5>
                          <ul className="text-sm space-y-1 mt-2">
                            <li>• Água pressurizada como moderador</li>
                            <li>• Circuito primário e secundário separados</li>
                            <li>• Mais comum mundialmente (~60%)</li>
                            <li>• Sistema de segurança passiva</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg bg-background">
                          <h5 className="font-semibold text-primary">BWR (Boiling Water Reactor)</h5>
                          <ul className="text-sm space-y-1 mt-2">
                            <li>• Água ferve dentro do reator</li>
                            <li>• Vapor direto para turbinas</li>
                            <li>• Sistema mais simples</li>
                            <li>• Controle por barras e vazão</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-primary/10 rounded text-sm">
                        <strong>⚡ Vantagem:</strong> Alta densidade energética - uma pequena quantidade de combustível nuclear produz enormes quantidades de energia.
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all cursor-pointer hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <Waves className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle>Energia Maremotriz</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Aproveitamento do movimento das marés oceânicas para geração de energia elétrica...</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl">
                      <Waves className="mr-3 h-8 w-8 text-blue-500" />
                      Energia Maremotriz
                    </DialogTitle>
                    <DialogDescription>
                      Aproveitamento do movimento das marés oceânicas para geração de energia elétrica através de turbinas submarinas.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Fórmula Principal */}
                    <div className="bg-muted/30 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3 text-primary">Fórmula Principal (Energia das Marés)</h4>
                      <div className="bg-background p-4 rounded border text-center mb-4">
                        <div className="text-lg font-mono">E = ½ × ρ × A × g × H²</div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li><strong>E</strong> = Energia por ciclo (Joules)</li>
                            <li><strong>ρ</strong> = Densidade da água do mar (~1025 kg/m³)</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li><strong>A</strong> = Área do reservatório (m²)</li>
                            <li><strong>H</strong> = Amplitude da maré (m)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Exemplo Prático */}
                    <div className="bg-primary/5 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3">Exemplo de Aplicação</h4>
                      <p className="text-sm mb-3">
                        Reservatório de <strong>10.000 m²</strong> com amplitude de maré de <strong>4 m</strong>:
                      </p>
                      <div className="bg-background p-3 rounded border text-center mb-4">
                        <div className="font-mono">E = 0,5 × 1025 × 10.000 × 9,81 × 4² ≈ 803 MJ</div>
                        <div className="text-xs mt-1 text-muted-foreground">Por ciclo de maré (~12,5 horas)</div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold">Barragens de Maré</h5>
                          <p className="text-sm">Aproveitam a diferença de nível entre marés altas e baixas</p>
                          <ul className="text-xs mt-2 space-y-1">
                            <li>• Exemplo: La Rance (França) - 240 MW</li>
                            <li>• Requer grandes diferenças de maré (&gt;5m)</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold">Turbinas de Corrente</h5>
                          <p className="text-sm">Funcionam submersas aproveitando fluxos de correntes marítimas</p>
                          <ul className="text-xs mt-2 space-y-1">
                            <li>• Menor impacto ambiental</li>
                            <li>• Funcionam em águas mais profundas</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Vantagens e Características */}
                    <div className="bg-secondary/10 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-3">Características e Vantagens</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-primary">🌊 Vantagens</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Previsibilidade:</strong> Marés são cíclicas e previsíveis</li>
                            <li>• <strong>Alta densidade:</strong> Água é 800x mais densa que ar</li>
                            <li>• <strong>Fonte limpa:</strong> Zero emissões durante operação</li>
                            <li>• <strong>Operação contínua:</strong> 4 ciclos de maré por dia</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-primary">📊 Locais Ideais</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Amplitude:</strong> Diferença &gt; 5m (barragens)</li>
                            <li>• <strong>Velocidade:</strong> Correntes &gt; 2,5 m/s</li>
                            <li>• <strong>Exemplos:</strong> Baía de Fundy, Canal da Mancha</li>
                            <li>• <strong>Potencial brasileiro:</strong> Maranhão, Amapá</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-primary/10 rounded text-sm">
                        <strong>🌍 Curiosidade:</strong> A maior amplitude de maré do mundo está na Baía de Fundy (Canadá) com até 16 metros de diferença.
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all cursor-pointer hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Thermometer className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle>Energia Geotérmica</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Utilização do calor natural do interior da Terra para aquecimento e geração de energia...</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl">
                      <Thermometer className="mr-3 h-8 w-8 text-red-500" />
                      Energia Geotérmica
                    </DialogTitle>
                    <DialogDescription>
                      Utilização do calor natural do interior da Terra para aquecimento e geração de energia elétrica através de vapor.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Fórmula Principal */}
                    <div className="bg-muted/30 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3 text-primary">Fórmula Principal (Potência Térmica)</h4>
                      <div className="bg-background p-4 rounded border text-center mb-4">
                        <div className="text-lg font-mono">P = ṁ × c<sub>p</sub> × ΔT × η</div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li><strong>P</strong> = Potência térmica (W)</li>
                            <li><strong>ṁ</strong> = Vazão mássica do fluido (kg/s)</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li><strong>c<sub>p</sub></strong> = Calor específico (~4186 J/kg·K)</li>
                            <li><strong>ΔT</strong> = Diferença de temperatura (K)</li>
                            <li><strong>η</strong> = Eficiência da usina (0,1 a 0,2)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Exemplo Prático */}
                    <div className="bg-primary/5 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3">Exemplo de Aplicação</h4>
                      <p className="text-sm mb-3">
                        Vazão de <strong>50 kg/s</strong>, ΔT = <strong>100°C</strong>, eficiência = <strong>15%</strong>:
                      </p>
                      <div className="bg-background p-3 rounded border text-center mb-4">
                        <div className="font-mono">P = 50 × 4186 × 100 × 0,15 ≈ 3,14 MW</div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold text-primary">Vapor Seco</h5>
                          <p className="text-sm">Vapor natural diretamente às turbinas</p>
                          <ul className="text-xs mt-1 space-y-1">
                            <li>• Temperatura: &gt;150°C</li>
                            <li>• Eficiência: 10-15%</li>
                            <li>• Mais simples</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold text-primary">Flash Steam</h5>
                          <p className="text-sm">Água quente vaporizada por despressurização</p>
                          <ul className="text-xs mt-1 space-y-1">
                            <li>• Temperatura: 180-370°C</li>
                            <li>• Mais comum</li>
                            <li>• Duplo flash possível</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold text-primary">Ciclo Binário</h5>
                          <p className="text-sm">Fluido secundário com ponto de ebulição menor</p>
                          <ul className="text-xs mt-1 space-y-1">
                            <li>• Temperatura: 85-175°C</li>
                            <li>• Eficiência: 10-13%</li>
                            <li>• Menor impacto ambiental</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Aplicações e Vantagens */}
                    <div className="bg-secondary/10 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-3">Aplicações por Temperatura</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-primary">🌡️ Altas Temperaturas (&gt;150°C)</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Geração de eletricidade</strong></li>
                            <li>• Usinas de vapor direto</li>
                            <li>• Maior eficiência energética</li>
                            <li>• Exemplos: Islândia, Califórnia</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-primary">🏠 Baixas Temperaturas (&lt;90°C)</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Aquecimento residencial e comercial</strong></li>
                            <li>• Processos industriais</li>
                            <li>• Agricultura (estufas)</li>
                            <li>• Aquicultura e turismo (spas)</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-primary/10 rounded text-sm">
                        <strong>🌋 Potencial Brasileiro:</strong> Caldas Novas (GO), Poços de Caldas (MG) e região amazônica com potencial para aquecimento e pequenas usinas.
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all cursor-pointer hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center">
                        <Leaf className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle>Biomassa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Conversão de matéria orgânica em energia elétrica através de combustão ou biodigestão...</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl">
                      <Leaf className="mr-3 h-8 w-8 text-green-600" />
                      Biomassa
                    </DialogTitle>
                    <DialogDescription>
                      Conversão de matéria orgânica (resíduos agrícolas, madeira, biogás) em energia elétrica através de combustão ou biodigestão.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Fórmula Principal */}
                    <div className="bg-muted/30 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3 text-primary">Fórmula Principal (Energia por Combustão)</h4>
                      <div className="bg-background p-4 rounded border text-center mb-4">
                        <div className="text-lg font-mono">E = m × PCI</div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li><strong>E</strong> = Energia liberada (MJ)</li>
                            <li><strong>m</strong> = Massa do combustível (kg)</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li><strong>PCI</strong> = Poder Calorífico Inferior (MJ/kg)</li>
                            <li><em>Varia conforme o tipo de biomassa</em></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Exemplo Prático */}
                    <div className="bg-primary/5 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3">Exemplo de Aplicação</h4>
                      <p className="text-sm mb-3">
                        Queima de <strong>1 tonelada de bagaço de cana</strong> (PCI = <strong>18 MJ/kg</strong>):
                      </p>
                      <div className="bg-background p-3 rounded border text-center mb-4">
                        <div className="font-mono">E = 1000 × 18 = 18.000 MJ</div>
                        <div className="text-xs mt-1 text-muted-foreground">Suficiente para abastecer ~20 residências por 1 dia</div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-primary">Biomassa Sólida</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Bagaço de cana:</strong> 18 MJ/kg</li>
                            <li>• <strong>Lenha seca:</strong> 15 MJ/kg</li>
                            <li>• <strong>Casca de arroz:</strong> 13 MJ/kg</li>
                            <li>• <strong>Palha:</strong> 12 MJ/kg</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-primary">Biogás/Biocombustíveis</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Metano (CH₄):</strong> 55 MJ/kg</li>
                            <li>• <strong>Etanol:</strong> 29 MJ/kg</li>
                            <li>• <strong>Biodiesel:</strong> 37 MJ/kg</li>
                            <li>• <strong>Dejetos suínos:</strong> 2,5 MJ/kg</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Processos de Conversão */}
                    <div className="bg-secondary/10 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-3">Processos de Conversão</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="p-4 border rounded-lg bg-background">
                          <h5 className="font-semibold text-primary">🔥 Combustão Direta</h5>
                          <p className="text-sm mb-2">Queima da biomassa para gerar vapor e acionar turbinas</p>
                          <ul className="text-xs space-y-1">
                            <li>• <strong>Eficiência:</strong> 20-30%</li>
                            <li>• <strong>Aplicação:</strong> Usinas termelétricas</li>
                            <li>• <strong>Combustível:</strong> Bagaço, cavaco, pellets</li>
                            <li>• <strong>Vantagem:</strong> Tecnologia madura</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg bg-background">
                          <h5 className="font-semibold text-primary">⚗️ Biodigestão Anaeróbica</h5>
                          <p className="text-sm mb-2">Decomposição sem oxigênio produzindo metano</p>
                          <ul className="text-xs space-y-1">
                            <li>• <strong>Produto:</strong> Biogás (50-70% CH₄)</li>
                            <li>• <strong>Aplicação:</strong> Motores a gás, microturbinas</li>
                            <li>• <strong>Matéria-prima:</strong> Dejetos animais, lixo orgânico</li>
                            <li>• <strong>Vantagem:</strong> Trata resíduos + gera energia</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-3 mt-4">
                        <div className="p-3 bg-primary/10 rounded text-sm">
                          <strong>🌱 Sustentabilidade:</strong> Aproveitamento de resíduos que seriam descartados
                        </div>
                        <div className="p-3 bg-primary/10 rounded text-sm">
                          <strong>💰 Economia:</strong> Reduz custos de descarte de resíduos
                        </div>
                        <div className="p-3 bg-primary/10 rounded text-sm">
                          <strong>🌍 CO₂ Neutro:</strong> CO₂ emitido foi absorvido durante crescimento
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Energias Não Renováveis */}
            <h3 className="text-3xl font-bold text-center mb-8 text-primary mt-16">Energias Não Renováveis</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all cursor-pointer hover:scale-105">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle>Termelétricas a Combustíveis Fósseis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Geração de energia através da queima de combustíveis fósseis como carvão, gás natural e óleo...</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl">
                      <Zap className="mr-3 h-8 w-8 text-gray-600" />
                      Termelétricas a Combustíveis Fósseis
                    </DialogTitle>
                    <DialogDescription>
                      Geração de energia através da queima de combustíveis fósseis para produzir vapor e acionar turbinas.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Fórmula Principal */}
                    <div className="bg-muted/30 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3 text-primary">Eficiência de Carnot (Máxima Teórica)</h4>
                      <div className="bg-background p-4 rounded border text-center mb-4">
                        <div className="text-lg font-mono">η = 1 - T<sub>fria</sub>/T<sub>quente</sub></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li><strong>η</strong> = Eficiência máxima teórica</li>
                            <li><strong>T<sub>fria</sub></strong> = Temperatura do reservatório frio (K)</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li><strong>T<sub>quente</sub></strong> = Temperatura do reservatório quente (K)</li>
                            <li><em>Temperaturas devem estar em Kelvin</em></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Exemplo Prático */}
                    <div className="bg-primary/5 p-6 rounded-lg border">
                      <h4 className="text-lg font-semibold mb-3">Exemplo de Aplicação</h4>
                      <p className="text-sm mb-3">
                        Usina com <strong>T<sub>quente</sub> = 800 K</strong> e <strong>T<sub>fria</sub> = 300 K</strong>:
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="bg-background p-3 rounded border text-center">
                          <div className="font-mono text-sm">η<sub>Carnot</sub> = 1 - 300/800 = 62,5% (teórica)</div>
                        </div>
                        <div className="bg-background p-3 rounded border text-center">
                          <div className="font-mono text-sm">η<sub>real</sub> ≈ 35% (usina convencional)</div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold text-primary">🏭 Carvão</h5>
                          <ul className="text-sm space-y-1 mt-2">
                            <li>• <strong>PCI:</strong> 25-30 MJ/kg</li>
                            <li>• <strong>Eficiência:</strong> 33-45%</li>
                            <li>• <strong>CO₂:</strong> ~1000 kg/MWh</li>
                            <li>• <strong>Uso:</strong> Base load</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold text-primary">🔥 Gás Natural</h5>
                          <ul className="text-sm space-y-1 mt-2">
                            <li>• <strong>PCI:</strong> 50 MJ/kg</li>
                            <li>• <strong>Eficiência:</strong> 40-60% (ciclo combinado)</li>
                            <li>• <strong>CO₂:</strong> ~400 kg/MWh</li>
                            <li>• <strong>Uso:</strong> Pico e intermediário</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-semibold text-primary">🛢️ Óleo Combustível</h5>
                          <ul className="text-sm space-y-1 mt-2">
                            <li>• <strong>PCI:</strong> 40 MJ/kg</li>
                            <li>• <strong>Eficiência:</strong> 35-40%</li>
                            <li>• <strong>CO₂:</strong> ~700 kg/MWh</li>
                            <li>• <strong>Uso:</strong> Backup/emergência</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Tecnologias Avançadas */}
                    <div className="bg-secondary/10 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-3">Tecnologias de Alta Eficiência</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="p-4 border rounded-lg bg-background">
                          <h5 className="font-semibold text-primary">⚡ Ciclo Combinado (Gás + Vapor)</h5>
                          <ul className="text-sm space-y-1 mt-2">
                            <li>• <strong>Eficiência:</strong> 55-62%</li>
                            <li>• Turbina a gás + recuperação de calor</li>
                            <li>• Vapor de escape aciona turbina a vapor</li>
                            <li>• Menor emissão de CO₂ por MWh</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg bg-background">
                          <h5 className="font-semibold text-primary">🔬 Captura de CO₂ (CCS)</h5>
                          <ul className="text-sm space-y-1 mt-2">
                            <li>• <strong>Captura:</strong> 85-95% do CO₂</li>
                            <li>• Tecnologias: pós-combustão, oxi-combustão</li>
                            <li>• Armazenamento geológico</li>
                            <li>• Reduz eficiência em ~10-15%</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded text-sm">
                          <strong>⚠️ Desafios:</strong> Emissões de CO₂, poluição do ar, dependência de combustíveis importados
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded text-sm">
                          <strong>🔄 Transição:</strong> Papel importante como backup para renováveis intermitentes
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Card Nuclear já existe acima, então não duplicamos */}
            </div>

            <Card className="shadow-[var(--shadow-elegant)] bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-center text-primary">Expertise Multidisciplinar</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Sistemas Elétricos de Potência</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Projeto e dimensionamento de subestações</li>
                      <li>• Estudos de proteção e seletividade</li>
                      <li>• Análise de curto-circuito e coordenação</li>
                      <li>• Sistemas de transmissão e distribuição</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Microgeração e Redes Inteligentes</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Sistemas de geração distribuída</li>
                      <li>• Integração com smart grids</li>
                      <li>• Armazenamento de energia (baterias)</li>
                      <li>• Medição inteligente e monitoramento</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-accent/30">
          <div className="container mx-auto max-w-6xl">
            <h2 id="sobre-mim" className="text-4xl font-bold text-center mb-12 text-primary">Sobre Mim</h2>
            <div className="flex flex-col gap-8 w-full">
              <Card className="shadow-[var(--shadow-card)] w-full flex flex-col justify-between p-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Target className="mr-3 h-6 w-6 text-primary" />
                    Visão Profissional
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg leading-relaxed">
                  Possuo mais de seis anos de experiência em posições de liderança na área de engenharia, onde atuei com protagonismo na estruturação de times, redefinição de fluxos operacionais e implementação de controles de performance em ambientes de alta complexidade.
                  </p>
                  <p className="text-lg leading-relaxed">
                  Minha abordagem gerencial é pautada na meritocracia, colaboração intersetorial e metodologias ágeis, promovendo entregas consistentes, escaláveis e alinhadas ao planejamento estratégico das organizações.                  </p>
                  <p className="text-lg leading-relaxed">
                  Formado em Engenharia de Energia e com especializações em manutenção aeronáutica, logística e inteligência artificial, adoto uma visão sistêmica e orientada a resultados, conectando dados, processos e pessoas em prol de metas bem definidas e sustentáveis.                  </p>
                  <p className="text-lg leading-relaxed">
                  Atualmente lidero um departamento com produção mensal de mais de 2.500 projetos, sendo responsável direto pela definição de indicadores-chave, governança técnica, otimização de recursos e elevação da maturidade operacional do time.                  </p>  
                  <p className="text-lg leading-relaxed"> 
                  Sou casado, pai de dois filhos, natural de Brasília-DF e não possuo restrições para viagens ou mudanças de cidade. Estou preparado para contribuir em posições de gerência ou diretoria, agregando visão estratégica, capacidade analítica e liderança adaptativa, com foco constante em performance, eficiência e geração de valor.                  </p>    
                
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-card)] w-full flex flex-col justify-between p-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl md:text-3xl">
                    <GraduationCap className="mr-3 h-7 w-7 text-primary" />
                    Formação Acadêmica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-xl md:text-2xl text-primary mb-2">Superior</h4>
                      <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
                        <li>Engenharia de Energia</li>
                        <li>Tecnólogo em Manutenção de Aeronaves</li>
                        <li>Gestão em Logística</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl md:text-2xl text-primary mb-2">Pós-graduação</h4>
                      <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
                        <li>Inteligência Artificial (Concluída)</li>
                        <li>Cidades Inteligentes - Smart Cities (Concluída)</li>
                        <li>BIM em Gerenciamento de Projetos e Qualidade de Obras (Concluída)</li>
                        <li>Automação Industrial (Concluída)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-card)] w-full flex flex-col justify-between p-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl md:text-3xl">
                    <Award className="mr-3 h-7 w-7 text-primary" />
                    Principais Competências
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ul className="list-disc pl-6 space-y-2 text-lg md:text-xl leading-relaxed">
                      <li>Liderança de equipes multidisciplinares</li>
                      <li>Gestão de projetos de energia</li>
                      <li>Gestão de processos e qualidade</li>
                      <li>Gestão de pessoas</li>
                      <li>Gestão estratégica</li>
                      <li>Automação e inovação tecnológica</li>
                      <li>Planejamento e controle de manutenção</li>
                      <li>Implantação de metodologias ágeis</li>
                      <li>Gestão de indicadores de desempenho</li>
                    </ul>
                    <ul className="list-disc pl-6 space-y-2 text-lg md:text-xl leading-relaxed">
                      <li>Gestão Ágil</li>
                      <li>Python</li>
                      <li>RPA</li>
                      <li>Power BI</li>
                      <li>Inteligência Artificial</li>
                      <li>Gestão Estratégica</li>
                      <li>Gestão de Pessoas</li>
                      <li>Gestão de Processos</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 px-6 bg-accent/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">Certificações e Cursos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Award className="mr-3 h-6 w-6 text-primary" />
                    Gestão Ágil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Metodologias Scrum e Kanban aplicadas a projetos de engenharia
                  </CardDescription>
                  <div className="mt-4">
                    <Badge variant="secondary" className="mr-2 mb-2">Scrum Master</Badge>
                    <Badge variant="secondary" className="mr-2 mb-2">Kanban</Badge>
                    
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Code className="mr-3 h-6 w-6 text-primary" />
                    Python
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Desenvolvimento de automações e análise de dados
                  </CardDescription>
                  <div className="mt-4">
                    <Badge variant="secondary" className="mr-2 mb-2">Pandas</Badge>
                    <Badge variant="secondary" className="mr-2 mb-2">NumPy</Badge>
                    <Badge variant="secondary" className="mr-2 mb-2">Matplotlib</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Cpu className="mr-3 h-6 w-6 text-primary" />
                    RPA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Automação de processos robóticos para otimização operacional
                  </CardDescription>
                  <div className="mt-4">
                    <Badge variant="secondary" className="mr-2 mb-2">automação-web</Badge>
                    <Badge variant="secondary" className="mr-2 mb-2">automação-desktop</Badge>
                    
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BarChart3 className="mr-3 h-6 w-6 text-primary" />
                    Power BI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Análise e visualização de dados para tomada de decisões
                  </CardDescription>
                  <div className="mt-4">
                    <Badge variant="secondary" className="mr-2 mb-2">DAX</Badge>
                    <Badge variant="secondary" className="mr-2 mb-2">M Query</Badge>
                    <Badge variant="secondary" className="mr-2 mb-2">Dashboards</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Lightbulb className="mr-3 h-6 w-6 text-primary" />
                    Inteligência Artificial
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Aplicação de IA em projetos de energia e automação
                  </CardDescription>
                  <div className="mt-4">
                    <Badge variant="secondary" className="mr-2 mb-2">Machine Learning</Badge>
                    <Badge variant="secondary" className="mr-2 mb-2">Deep Learning</Badge>
                    
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Target className="mr-3 h-6 w-6 text-primary" />
                    Gestão Estratégica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Planejamento estratégico e gestão de indicadores de performance
                  </CardDescription>
                  <div className="mt-4">
                    <Badge variant="secondary" className="mr-2 mb-2">KPI</Badge>
                    <Badge variant="secondary" className="mr-2 mb-2">OKR</Badge>
                    
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">Experiência Profissional</h2>
            <div className="space-y-8">
              {experienceData.map((exp, index) => (
                <Card key={index} className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-primary">{exp.company}</CardTitle>
                        <CardDescription className="text-lg font-medium">{exp.position}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{exp.period}</Badge>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {exp.location}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <TrendingUp className="mr-3 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section id="performance" className="py-20 px-6 bg-accent/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">Performance</h2>
            
            {/* Projetos Supervisionados */}
            <Card className="shadow-[var(--shadow-elegant)] mb-8 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Projetos Supervisionados por Iris Roberto</CardTitle>
                <CardDescription className="text-center">Resultados alcançados sob minha liderança técnica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <h3 className="text-3xl font-bold text-primary mb-2">26.634</h3>
                    <p className="text-muted-foreground">Projetos em 2024</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <h3 className="text-3xl font-bold text-primary mb-2">17.500</h3>
                    <p className="text-muted-foreground">Projetos 2025 (até julho)</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <h3 className="text-3xl font-bold text-green-600 mb-2">44.134</h3>
                    <p className="text-muted-foreground"><strong>Total Supervisionado</strong></p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Badge variant="secondary" className="text-lg px-6 py-2">
                    Produção média mensal: 2.500 projetos
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Comparativo Histórico */}
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-center">Comparativo 2023 vs 2024</CardTitle>
                <CardDescription className="text-center">Principais indicadores de crescimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4">Indicador</th>
                        <th className="text-center py-4">2023</th>
                        <th className="text-center py-4">2024</th>
                        <th className="text-center py-4">Variação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {performanceData.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-4 font-medium">{item.metric}</td>
                          <td className="text-center py-4">{item.value2023}</td>
                          <td className="text-center py-4">{item.value2024}</td>
                          <td className="text-center py-4">
                            <Badge variant="secondary" className="text-primary font-bold">
                              {item.growth}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>



        {/* Mentalidade e Ferramentas do Cotidiano */}
        <section id="ferramentas" className="py-20 px-6 bg-accent/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">Mentalidade e Ferramentas do Cotidiano</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {img: gestaoAgil, titulo: 'Gestão Ágil', desc: 'Metodologias ágeis para equipes de alta performance.'},
                {img: python, titulo: 'Python', desc: 'Automação, análise de dados e scripts inteligentes.'},
                {img: rpa, titulo: 'RPA', desc: 'Robotic Process Automation para otimizar processos repetitivos.'},
                {img: powerBI, titulo: 'Power BI', desc: 'Visualização e análise de dados para decisões estratégicas.'},
                {img: ia, titulo: 'Inteligência Artificial', desc: 'Aplicação de IA para inovação e eficiência.'},
                {img: gestaoEstrategica, titulo: 'Gestão Estratégica', desc: 'Planejamento e execução de estratégias empresariais.'},
                {img: gestaoPessoas, titulo: 'Gestão de Pessoas', desc: 'Liderança, motivação e desenvolvimento de equipes.'},
                {img: gestaoProcesso, titulo: 'Gestão de Processos', desc: 'Otimização e controle de processos organizacionais.'},
              ].map((item, i) => (
                <div key={item.titulo} className="group flex flex-col items-center justify-center bg-white dark:bg-background rounded-xl shadow-md p-6 border border-primary/10 transition-all hover:scale-105 cursor-pointer text-center min-h-[220px] min-w-[200px] h-[220px] w-[200px]">
                  <img 
                    src={item.img} 
                    alt={item.titulo} 
                    className={
                      item.titulo === 'Gestão de Processos'
                        ? 'h-16 w-16 object-contain mb-4'
                        : item.titulo === 'RPA' || item.titulo === 'Power BI'
                          ? 'h-36 w-36 max-h-32max-w-32 object-contain mb-4'
                          : 'h-24 w-24 max-h-24 max-w-24 object-contain mb-4'
                    }
                    loading="lazy" 
                  />
                  <p className="font-bold text-lg text-primary mb-1">{item.titulo}</p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary/90 text-white text-xs rounded p-2 mt-2 absolute z-20 w-48 left-1/2 -translate-x-1/2 shadow-lg pointer-events-none">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">Contato</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle>Entre em Contato</CardTitle>
                  <CardDescription>Vamos conversar sobre Gestão de projetos e Geração de energia.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                      placeholder="Seu nome" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      placeholder="Seu email" 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      placeholder="Assunto" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                    <Textarea 
                      placeholder="Sua mensagem" 
                      rows={4} 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                    
                    {/* Status messages */}
                                   {submitStatus === 'success' && (
                 <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                   ✅ Mensagem enviada com sucesso! 
                   <br />📱 Abra o WhatsApp para ver a conversa
                   <br />💾 Mensagem também armazenada no sistema
                 </div>
               )}
                    {submitStatus === 'error' && (
                      <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        ❌ Erro ao enviar mensagem. Tente novamente.
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <CardTitle>Conecte-se</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start bg-white text-primary border-primary hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70" 
                      size="lg"
                      onClick={() => window.open('https://www.linkedin.com/in/iris-roberto-engenharia-de-energia-sustent%C3%A1vel?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bq1qWAVefT%2BS41upBaRml3Q%3D%3D', '_blank')}
                      aria-label="Acessar perfil LinkedIn de Iris Roberto dos Santos Ferreira"
                    >
                      <Linkedin className="mr-3 h-5 w-5" aria-hidden="true" />
                      LinkedIn - Iris Roberto
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      size="lg"
                      onClick={() => {
                        const message = encodeURIComponent("Olá Iris! Vi seu portfólio e gostaria de conversar sobre projetos de energia sustentável. Podemos agendar uma conversa?");
                        window.open(`https://wa.me/5553999004179?text=${message}`, '_blank');
                      }}
                    >
                      <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      WhatsApp - (53) 99900-4179
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <CardTitle>Sobre a EcoPower</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">
                      <strong>Presente em todo o país</strong>, a EcoPower é a empresa de energia solar 
                      que mais cresce no Brasil.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-primary/10 rounded">
                        <p className="font-bold text-lg text-primary">+75.000</p>
                        <p className="text-xs">Projetos Instalados</p>
                      </div>
                      <div className="text-center p-3 bg-primary/10 rounded">
                        <p className="font-bold text-lg text-primary">26</p>
                        <p className="text-xs">Estados + DF</p>
                      </div>
                      <div className="text-center p-3 bg-primary/10 rounded">
                        <p className="font-bold text-lg text-primary">+350</p>
                        <p className="text-xs">Franqueados</p>
                      </div>
                      <div className="text-center p-3 bg-primary/10 rounded">
                        <p className="font-bold text-lg text-primary">+400</p>
                        <p className="text-xs">Colaboradores</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Projetos em Destaque */}
        <section className="w-full flex justify-center bg-gradient-to-r from-secondary/5 to-primary/10 py-12 border-b border-border">
          <div className="max-w-6xl w-full px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">Projetos em Destaque</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  img: empresarialImg,
                  nome: "Spetra Honda",
                  categoria: "Empresarial",
                  descricao: "1 Inversor WEG 60, 167 módulos 410 Wp, 68.33 kWp",
                },
                {
                  img: ruralImg,
                  nome: "Dois Lagos",
                  categoria: "Rural",
                  descricao: "1 Inversor WEG 60, 167 módulos 410 Wp, 68.33 kWp",
                },
                {
                  img: industrialImg,
                  nome: "Casa Geraldo",
                  categoria: "Industrial",
                  descricao: "1 Inversor WEG 60, 167 módulos 410 Wp, 68.33 kWp",
                }
              ].map((proj, i) => (
                <motion.div
                  key={proj.nome}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative bg-white dark:bg-accent/30 rounded-xl shadow-lg p-0 border border-primary/10 flex flex-col items-center overflow-hidden"
                >
                  <img src={proj.img} alt={`Foto real do projeto ${proj.nome} (${proj.categoria})`} className="w-full h-56 object-cover" loading="lazy" />
                  <span className="absolute top-4 left-4 bg-green-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow">{proj.categoria}</span>
                  <div className="w-full p-6 pt-4 flex flex-col items-start">
                    <span className="font-bold text-2xl text-white drop-shadow-sm mb-1" style={{ WebkitTextStroke: '1px #222' }}>{proj.nome}</span>
                    <span className="text-base text-white drop-shadow-sm mb-2" style={{ WebkitTextStroke: '0.5px #222' }}>{proj.descricao}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-primary via-emerald-700 to-primary text-primary-foreground py-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="text-xl font-extrabold mb-1">Iris Roberto dos Santos Ferreira</p>
              <p className="opacity-80 text-sm mb-3">Supervisor de Engenharia · EcoPower Energia Solar</p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-white/15 text-xs px-2 py-0.5 rounded-full">Esp. Inteligência Artificial</span>
                <span className="bg-white/15 text-xs px-2 py-0.5 rounded-full">Esp. Smart Cities</span>
                <span className="bg-white/15 text-xs px-2 py-0.5 rounded-full">Esp. BIM</span>
                <span className="bg-white/15 text-xs px-2 py-0.5 rounded-full">Esp. Automação Industrial</span>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-3 opacity-90">Especialidades</p>
              <ul className="space-y-1 text-sm opacity-80">
                <li>• Engenharia de Energia Solar</li>
                <li>• BIM e Gerenciamento de Projetos</li>
                <li>• Inteligência Artificial Aplicada</li>
                <li>• Automação e IoT Industrial</li>
                <li>• Cidades Inteligentes</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3 opacity-90">Contato Rápido</p>
              <div className="space-y-2">
                <button
                  onClick={() => window.open('https://wa.me/5553999004179', '_blank')}
                  className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  <span>📱 (53) 99900-4179</span>
                </button>
                <button
                  onClick={() => window.open('https://www.linkedin.com/in/iris-roberto-engenharia-de-energia-sustent%C3%A1vel', '_blank')}
                  className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-sm opacity-60">
              © 2025 · Iris Roberto dos Santos Ferreira · Liderança em Engenharia de Energia e Inovação Sustentável
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;