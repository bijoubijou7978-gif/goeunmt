/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { motion, AnimatePresence, useInView, useSpring, useTransform } from 'motion/react';
import { 
  Search, 
  Smartphone, 
  CheckCircle, 
  MapPin, 
  Star, 
  Home, 
  PhoneCall, 
  Crown, 
  RefreshCw, 
  BarChart3,
  Map,
  Users,
  Video,
  PenTool,
  Megaphone,
  Check,
  ChevronDown
} from 'lucide-react';

// Counter Component for animated numbers
const Counter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useSpring(0, {
    bounce: 0,
    duration: duration * 1000,
  });

  React.useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, count, value]);

  React.useEffect(() => {
    return count.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString() + suffix;
      }
    });
  }, [count, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
};

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    concern: '',
    place: '',
    services: [] as string[]
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const formatPhone = (value: string) => {
    const val = value.replace(/\D/g, '');
    if (val.length <= 3) return val;
    if (val.length <= 7) return `${val.slice(0, 3)}-${val.slice(3)}`;
    return `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.name || !formData.phone || !formData.concern || formData.services.length === 0) {
      alert('필수 항목(*)을 모두 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('consultations')
        .insert([
          {
            company: formData.company,
            name: formData.name,
            phone: formData.phone,
            concern: formData.concern,
            place: formData.place,
            services: formData.services
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        alert('상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-gold-brand/30">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-navy flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_10%,rgba(30,95,173,0.25)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(200,147,42,0.12)_0%,transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        <div className="absolute top-[-80px] left-[-80px] w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(30,95,173,0.15)_0%,transparent_70%)] animate-float-orb" />
        <div className="absolute bottom-15 right-[-40px] w-52 h-52 rounded-full bg-[radial-gradient(circle,rgba(200,147,42,0.2)_0%,transparent_70%)] animate-float-orb [animation-delay:3s]" />

        <div className="relative z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-gold-brand/15 border border-gold-brand/40 rounded-full px-5 py-2 text-xs md:text-sm font-medium text-gold-light mb-7 tracking-wider"
          >
            <span className="text-[10px]">✦</span> 대표 직접 1:1 밀착 관리
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.2] mb-3"
          >
            소비자 여정 전체를<br />
            <span className="text-gold-light relative inline-block">
              하나의 흐름
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gold-brand rounded-full origin-left"
              />
            </span>
            으로 설계합니다
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/65 font-light tracking-wide mb-9"
          >
            검색부터 방문까지 — 고은마케팅이 홍보 사이클 전체를 책임집니다
          </motion.p>

          <motion.a 
            href="#contact"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3 }}
            className="inline-block bg-linear-to-br from-gold-brand to-gold-light text-navy text-base md:text-lg font-bold px-10 py-4 rounded-full shadow-[0_8px_32px_rgba(200,147,42,0.35)] hover:translate-y-[-3px] hover:shadow-[0_14px_40px_rgba(200,147,42,0.5)] transition-all duration-200"
          >
            무료 상담 신청하기 →
          </motion.a>
        </div>

        <div className="absolute bottom-8 flex flex-col items-center gap-1.5 opacity-40">
          <span className="text-[10px] text-white tracking-[0.1em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white animate-bounce" />
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="section-label">WHY GOEUN</div>
            <div className="gold-line" />
            <h2 className="section-title">왜 고은마케팅인가요?</h2>
            <p className="section-desc">
              담당자가 바뀌고 보고서만 날아오는 마케팅 말고,<br />
              대표가 직접 붙어서 결과를 만드는 마케팅을 경험해보세요.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-14">
            {[
              { icon: <Crown className="w-8 h-8 text-gold-brand" />, title: "대표 직접 1:1 관리", desc: "중간 담당자 없이 대표가 직접 전략 수립부터 실행까지 모든 과정을 밀착 관리합니다." },
              { icon: <RefreshCw className="w-8 h-8 text-blue-brand" />, title: "홍보 사이클 전문가", desc: "소비자 검색 → SNS 탐색 → 플레이스 확인 → 방문까지, 전체 여정을 하나의 전략으로 설계합니다." },
              { icon: <BarChart3 className="w-8 h-8 text-gold-brand" />, title: "고밀도 밀착 마케팅", desc: "단순 콘텐츠 제작이 아닌, 구매 전환율을 높이는 정밀한 노출 전략을 실행합니다." }
            ].map((item, i) => (
              <div key={i} className="h-full">
                <Reveal delay={i * 0.1} className="h-full">
                  <div className="h-full group relative bg-cream border border-navy/10 rounded-2xl p-9 overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy/10 transition-all duration-300 flex flex-col">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-brand to-gold-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="font-serif text-xl font-bold text-navy mb-2.5">{item.title}</h3>
                    <p className="text-sm text-text-body leading-relaxed flex-1">{item.desc}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cycle Section */}
      <section className="relative bg-navy py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_50%,rgba(30,95,173,0.2)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_90%_20%,rgba(200,147,42,0.1)_0%,transparent_60%)]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <div className="section-label !text-gold-light">THE MARKETING CYCLE</div>
            <div className="gold-line" />
            <h2 className="section-title !text-white">소비자가 움직이는 홍보 사이클</h2>
            <p className="section-desc !text-white/65">
              고은마케팅은 이 흐름을 누구보다 정확히 이해합니다.<br />
              각 단계마다 소비자와 만나는 접점을 전략적으로 배치합니다.
            </p>
          </Reveal>

          <div className="mt-20 max-w-5xl mx-auto relative">
            {/* Central Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-gold-brand/0 via-gold-brand/40 to-gold-brand/0 md:-translate-x-1/2" />

            <div className="flex flex-col gap-12 md:gap-0">
              {[
                { icon: <Search className="w-4 h-4" />, step: "STEP 01", title: "네이버 검색", desc: "소비자가 원하는 것을 검색합니다", side: "left" },
                { icon: <Smartphone className="w-4 h-4" />, step: "STEP 02", title: "SNS & 블로그 탐색", desc: "숏츠, 릴스, 체험 후기 블로그를 탐색합니다", side: "right" },
                { icon: <CheckCircle className="w-4 h-4" />, step: "STEP 03", title: "업체 선택", desc: "마음에 드는 업체를 선택합니다", side: "left" },
                { icon: <MapPin className="w-4 h-4" />, step: "STEP 04", title: "네이버 플레이스 방문", desc: "업체 정보를 네이버 플레이스에서 확인합니다", side: "right" },
                { icon: <Star className="w-4 h-4" />, step: "STEP 05", title: "리뷰 확인", desc: "방문자 리뷰, 블로그 후기를 꼼꼼히 검토합니다", side: "left" },
                { icon: <Home className="w-4 h-4" />, step: "STEP 06", title: "홈페이지 방문", desc: "홈페이지에서 브랜드를 최종 확인합니다", side: "right" },
                { icon: <PhoneCall className="w-4 h-4" />, step: "STEP 07", title: "방문 예약 & 방문", desc: "위치 확인 후 연락처로 예약 또는 직접 방문합니다", side: "left" }
              ].map((item, i) => (
                <div key={i} className="relative md:h-32 flex items-center">
                  <Reveal delay={i * 0.1} className="w-full">
                    <div className={`grid grid-cols-[48px_1fr] md:grid-cols-[1fr_48px_1fr] gap-4 md:gap-12 items-center`}>
                      {/* Left Side Content */}
                      <div className={`${item.side === 'left' ? 'md:block' : 'md:invisible'} order-2 md:order-1`}>
                        <div className={`bg-navy-mid/40 border border-white/10 rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-gold-brand/30 group ${item.side === 'left' ? 'md:text-right' : ''}`}>
                          <span className="text-[10px] font-bold tracking-widest text-gold-light block mb-1">{item.step}</span>
                          <h4 className="text-sm md:text-base font-bold text-white mb-1 flex items-center gap-2 justify-end">
                            {item.side === 'left' && <span className="w-1.5 h-1.5 rounded-full bg-gold-light" />}
                            {item.title}
                          </h4>
                          <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>

                      {/* Center Icon */}
                      <div className="order-1 md:order-2 flex justify-center relative z-10">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-navy border-2 border-gold-brand flex items-center justify-center text-gold-light shadow-[0_0_20px_rgba(200,147,42,0.2)]">
                          {item.icon}
                        </div>
                      </div>

                      {/* Right Side Content */}
                      <div className={`${item.side === 'right' ? 'md:block' : 'md:invisible'} order-2 md:order-3`}>
                        <div className="bg-navy-mid/40 border border-white/10 rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-gold-brand/30 group">
                          <span className="text-[10px] font-bold tracking-widest text-gold-light block mb-1">{item.step}</span>
                          <h4 className="text-sm md:text-base font-bold text-white mb-1 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-light" />
                            {item.title}
                          </h4>
                          <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <p className="text-center text-[11px] font-bold tracking-widest text-gold-light mb-8 uppercase">고은마케팅이 채워드리는 채널</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { icon: "🗺️", label: "네이버 플레이스" },
                { icon: "✍️", label: "브랜드 블로그" },
                { icon: "📝", label: "블로그 상위노출" },
                { icon: "🎬", label: "유튜브 숏츠" },
                { icon: "📸", label: "인스타 릴스" },
                { icon: "📎", label: "네이버 클립" }
              ].map((ch, i) => (
                <div key={i} className="bg-navy-mid/30 border border-white/10 rounded-xl p-5 text-center hover:bg-gold-brand/10 hover:border-gold-brand/30 transition-all duration-300 cursor-default flex flex-col items-center gap-3">
                  <span className="text-2xl block">{ch.icon}</span>
                  <span className="text-[11px] font-semibold text-white/70 tracking-tight">{ch.label}</span>
                </div>
              ))}
            </div>
          </div>

          <Reveal delay={0.5}>
            <div className="mt-16 text-center p-10 md:p-12 bg-navy-mid/20 border border-white/10 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-gold-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="font-serif text-lg md:text-xl font-semibold text-gold-light leading-relaxed relative z-10">
                소비자가 검색하고, 탐색하고, 결정하는 모든 순간에<br />
                <strong className="text-white">고은마케팅이 당신의 브랜드를 노출시킵니다.</strong><br />
                <span className="text-white/60 text-base font-normal mt-2 block italic">이것이 고밀도 밀착 마케팅입니다.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Synergy Section */}
      <section className="bg-navy py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-brand/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                각 채널이 모여 <span className="text-gold-light">하나의 완벽한 정보</span>가 됩니다
              </h2>
              <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                단순히 여러 곳에 올리는 것이 아닙니다.<br />
                각 채널의 명확한 역할과 의미를 이해하고, 유기적으로 연결하여 폭발적인 시너지를 만듭니다.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                num: "01",
                title: "브랜드 블로그",
                accent: "브랜드 블로그 대행",
                desc: "운영 가치, 철학, 전문성, 고객과의 소통 방식, 업체 탄생 스토리 등을 차곡차곡 쌓아갑니다. 고객이 글을 읽으며 '아, 이래서 여기가 인기가 좋구나!' 하고 깊은 신뢰를 느끼게 만드는 기본이자 핵심입니다.",
                icon: <PenTool className="w-6 h-6 text-blue-brand" />,
                iconBg: "bg-blue-brand/10"
              },
              {
                num: "02",
                title: "SNS (숏츠, 릴스, 클립)",
                accent: "제작 & 업로드",
                desc: "짧고 강렬한 영상으로 트렌디한 흐름을 타고 궁금증과 호기심을 자극합니다. 수많은 콘텐츠 속에서도 소비자의 눈에 확 들어오게 만들어, 우리 브랜드를 최초로 인지시키는 중요한 역할을 합니다.",
                icon: <Video className="w-6 h-6 text-gold-brand" />,
                iconBg: "bg-gold-brand/10"
              },
              {
                num: "03",
                title: "블로그 포스팅",
                accent: "블로거 모집 · 배포 · 상위노출",
                desc: "정보성, 홍보성, 후기성 글을 통해 업체에 대한 세밀한 이야기들을 전달합니다. 소비자가 궁금해하는 장단점과 디테일한 정보들을 꼼꼼하게 채워주어 선택에 확신을 더합니다.",
                icon: <Users className="w-6 h-6 text-blue-brand" />,
                iconBg: "bg-blue-brand/10"
              },
              {
                num: "04",
                title: "네이버 플레이스",
                accent: "플레이스 SEO최적화 · 관리 · 상위노출",
                desc: "업체의 정확한 정보와 위치를 확인하고, 실제 방문했던 사람들의 리뷰를 통해 마지막으로 검증하는 공간입니다. 풍부하고 진정성 있는 리뷰가 쌓일수록 방문 전환율은 폭발적으로 상승합니다.",
                icon: <MapPin className="w-6 h-6 text-gold-brand" />,
                iconBg: "bg-gold-brand/10"
              }
            ].map((item, i) => (
              <div key={i} className="h-full">
                <Reveal delay={i * 0.1} className="h-full">
                  <div className="bg-white rounded-2xl p-8 md:p-10 h-full flex flex-col shadow-xl shadow-navy/20 hover:translate-y-[-5px] transition-transform duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-navy/30 tracking-widest">{item.num}</span>
                          <h3 className="text-lg md:text-xl font-bold text-navy">{item.title}</h3>
                        </div>
                        <p className="text-xs md:text-sm font-semibold text-gold-brand mt-1">{item.accent}</p>
                      </div>
                    </div>
                    <p className="text-sm text-text-body leading-relaxed flex-1">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="section-label">SERVICES</div>
            <div className="gold-line" />
            <h2 className="section-title">제공 서비스</h2>
            <p className="section-desc">사이클의 모든 단계를 커버하는 5가지 핵심 서비스</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-14">
            {[
              { icon: <Map className="w-9 h-9" />, title: "플레이스 최적화 & 상위노출", num: "01" },
              { icon: <Users className="w-9 h-9" />, title: "체험단 모집", num: "02" },
              { icon: <Video className="w-9 h-9" />, title: "SNS 영상 배포 (숏츠 · 릴스)", num: "03" },
              { icon: <PenTool className="w-9 h-9" />, title: "브랜드 블로그 운영", num: "04" },
              { icon: <Megaphone className="w-9 h-9" />, title: "최상위 블로그 배포", num: "05" }
            ].map((service, i) => (
              <div key={i} className="h-full">
                <Reveal delay={i * 0.1} className="h-full">
                  <div className="h-full relative bg-white border border-navy/5 rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy/10 hover:border-blue-brand transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-brand/5 to-gold-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-[10px] font-bold tracking-widest text-gold-brand block mb-3">SERVICE {service.num}</span>
                    <div className="flex justify-center mb-4 text-navy group-hover:text-blue-brand transition-colors duration-300">{service.icon}</div>
                    <h3 className="font-serif text-sm md:text-base font-bold text-navy leading-snug">{service.title}</h3>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-navy py-20 px-6 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-gold-brand rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-blue-brand rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "대표 직접 기획", value: 100, suffix: "%" },
              { label: "클라이언트 재계약률", value: 90, suffix: "%+" },
              { label: "누적 작업 건수", value: 632, suffix: "건" },
              { label: "매출 증가 사례", value: 584, suffix: "건" }
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="inline-block mb-4">
                    <div className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 flex items-center justify-center">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="h-1 w-12 bg-gold-brand mx-auto rounded-full group-hover:w-20 transition-all duration-500" />
                  </div>
                  <p className="text-sm md:text-base font-bold text-white/60 tracking-wider uppercase">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="section-label">PORTFOLIO</div>
            <h2 className="section-title">성공을 증명하는 포트폴리오</h2>
            <div className="gold-line mx-auto" />
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "인테리어 업체", desc: "감성 공간 기획 및 마케팅", img: "https://blog.kakaocdn.net/dna/bqXTTu/dJMcagSj6LO/AAAAAAAAAAAAAAAAAAAAAOgG6KUgQF2hCIDWfukWle_HO7ZFgNf45GrJqGK8Zhgk/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1774969199&allow_ip=&allow_referer=&signature=gIiVFSkI4Csln79rMb3nIFHc8ck%3D" },
              { title: "방충망업체", desc: "예약률 200% 상승 전략", img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FOs3H8%2FdJMcabDtK7Q%2FAAAAAAAAAAAAAAAAAAAAAJFGiZiCyh8cEpRQ0iGIbQb3qKHAjU0dUp_KLq3JwO1y%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3Dq2ngIvooAgdPVrD9hmMbn3y3PL0%253D" },
              { title: "설비업체", desc: "타겟 맞춤형 콘텐츠 제작", img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbZAf3S%2FdJMcadusmS6%2FAAAAAAAAAAAAAAAAAAAAAG-ziMtcJVOKe3MbJl3JYUROEQYDsboKwgtBEQeNbhjR%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3DhKhEgZ7pxgHHjGbiLOleq004ftY%253D" },
              { title: "요식업 맛집업체", desc: "후기강화 플레이스최적화 모객성공", img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbqTPJn%2FdJMcaiihH5f%2FAAAAAAAAAAAAAAAAAAAAAAg7iVHynTK2CCVX9w1e-S8qgpeS1AwdCzIzdVJNHnzj%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3DqrXUrw73k22Ya%252Bl74vnCGY1%252B0k4%253D" },
              { title: "라인댄스업체", desc: "룩북 촬영 및 SNS 통합 관리", img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbfruR3%2FdJMcabQZDzJ%2FAAAAAAAAAAAAAAAAAAAAAK2kWrAOsWy6gp-VX-4tn6iEZtI530d3f3V-B9VLwQ5q%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3Dw1uNH9m%252FEzQModC3HcyIDrkGbHE%253D" },
              { title: "대형펜션리조트업체", desc: "전국 지점 통합 마케팅 구축", img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FcauJCy%2FdJMcahjpRZP%2FAAAAAAAAAAAAAAAAAAAAAPrO3taIfjO9d4WNJluY2vi9R10eyxUQjiW24EPkoIZG%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3DzymqGIz5s45WBQJQ9Pxw6YgkAB0%253D" },
              { title: "점핑클럽 업체", desc: "건강헬스신뢰 및회원유치상승", img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FpNnKn%2FdJMcafsj7jh%2FAAAAAAAAAAAAAAAAAAAAABZOfifq5Brr3KuxhfLwxkoPVne9WtjM9D3E5Tea24TS%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3DUEpMI38C%252FeB%252FJf6wMUgbtP%252FBqlk%253D" },
              { title: "입주청소업체", desc: "신뢰도 높은 전문가 이미지 구축", img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbyhOzp%2FdJMcafFSrLZ%2FAAAAAAAAAAAAAAAAAAAAAGJHLtAblx947aS3oKNUDkdCopUJn0aT-Uwv0i0mZk2r%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3D3FHqmf5zTpNNqpvsYjz23JQWCvk%253D" }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group">
                  <div className="aspect-square overflow-hidden rounded-xl mb-4 shadow-md group-hover:shadow-xl transition-all duration-500">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="px-1">
                    <h3 className="font-serif text-base md:text-lg font-bold text-navy mb-1">{item.title}</h3>
                    <p className="text-xs md:text-sm text-navy/60 leading-tight line-clamp-2">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Management Section */}
      <section className="bg-linear-to-br from-navy to-navy-mid py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="section-label !text-gold-light">DIRECT MANAGEMENT</div>
            <div className="gold-line mx-auto" />
            <h2 className="section-title !text-white">대표가 직접 함께합니다</h2>
            <p className="section-desc !text-white/65 mx-auto">
              담당자가 몇 번이고 바뀌거나, 보고서만 날아오는 마케팅은 그만.<br />
              고은마케팅은 대표가 처음부터 끝까지 직접 1:1로 함께합니다.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto">
            {[
              "전략 수립부터 실행까지 직접",
              "빠른 소통 & 즉각적인 피드백",
              "업체 맞춤 개인화 전략",
              "투명한 진행 공유"
            ].map((text, i) => (
              <div key={i} className="flex items-center justify-center gap-2.5 bg-white/5 border border-white/15 rounded-full px-6 py-3.5 text-sm md:text-base font-semibold text-white hover:bg-white/10 transition-colors duration-300">
                <div className="w-2 h-2 rounded-full bg-gold-light animate-pulse shadow-[0_0_0_0_rgba(200,147,42,0.5)]" />
                {text}
              </div>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="flex justify-center gap-6 mt-16">
              <div className="relative group">
                <div className="w-40 h-52 md:w-48 md:h-64 overflow-hidden rounded-2xl border-2 border-gold-light/30 shadow-2xl">
                  <img 
                    src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fbxzcej%2FdJMcaaYQRnv%2FAAAAAAAAAAAAAAAAAAAAAK5b6pI4lDghLCIxDJwO18NSqll3zogwp6AAClLsyqMp%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3Dwo%252B4tdfSwCbqK%252F3W3iudXfQRa1k%253D" 
                    alt="대표 프로필 1" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-gold-brand text-navy text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">DIRECTOR</div>
              </div>
              <div className="relative group">
                <div className="w-40 h-52 md:w-48 md:h-64 overflow-hidden rounded-2xl border-2 border-gold-light/30 shadow-2xl">
                  <img 
                    src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fb31oth%2FdJMcac98C2n%2FAAAAAAAAAAAAAAAAAAAAAFb_KnjdeML9_PoyOU4MzIw4tUISs1C_jBSLfzifB-jP%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3D%252B0ffTVXpa0oCSmXkuvLBbWeA9bs%253D" 
                    alt="대표 프로필 2" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-gold-brand text-navy text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">MARKETER</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
            <div className="reveal">
              <div className="section-label">FREE CONSULTATION</div>
              <div className="gold-line" />
              <h3 className="font-serif text-2xl font-bold text-navy mb-4">무료 마케팅 상담 신청</h3>
              <p className="text-base text-text-body leading-relaxed mb-8">지금 바로 문의해 주시면<br />대표가 직접 검토 후 연락드립니다.</p>
              
              <div className="flex flex-col gap-3">
                {[
                  "24시간 내 대표 직접 회신",
                  "맞춤형 마케팅 전략 제안",
                  "상담 비용 전혀 없음",
                  "개인정보 철저히 보호"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-text-body">
                    <div className="w-5.5 h-5.5 rounded-full bg-linear-to-br from-blue-brand to-blue-light flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Reveal>
              <div className="bg-cream rounded-3xl p-9 md:p-10 border border-navy/5 shadow-sm">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-navy">업체명 <span className="text-gold-brand">*</span></label>
                        <input 
                          type="text" 
                          id="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border border-navy/15 rounded-xl text-sm focus:border-blue-brand focus:ring-3 focus:ring-blue-brand/10 outline-none transition-all"
                          placeholder="업체명을 입력해주세요"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-navy">담당자 이름 <span className="text-gold-brand">*</span></label>
                        <input 
                          type="text" 
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border border-navy/15 rounded-xl text-sm focus:border-blue-brand focus:ring-3 focus:ring-blue-brand/10 outline-none transition-all"
                          placeholder="담당자 성함을 입력해주세요"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-navy">연락처 <span className="text-gold-brand">*</span></label>
                      <input 
                        type="tel" 
                        id="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="w-full px-4 py-3 bg-white border border-navy/15 rounded-xl text-sm focus:border-blue-brand focus:ring-3 focus:ring-blue-brand/10 outline-none transition-all"
                        placeholder="010-0000-0000"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[13px] font-bold text-navy">어떤 마케팅이 필요하신가요? <span className="text-gold-brand">*</span><br />
                        <span className="font-normal text-gray-500 text-xs">(복수 선택 가능)</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          { id: "place", label: "📍 플레이스 최적화 & 상위노출" },
                          { id: "review", label: "🤝 체험단 모집" },
                          { id: "sns", label: "🎬 SNS 영상 배포 (숏츠 · 릴스)" },
                          { id: "blog-brand", label: "✍️ 브랜드 블로그 운영" },
                          { id: "blog-top", label: "📢 최상위 블로그 배포" }
                        ].map((s) => (
                          <label 
                            key={s.id} 
                            className={`flex items-start gap-3 p-3 bg-white border rounded-xl text-[13px] cursor-pointer transition-all ${
                              formData.services.includes(s.id) ? 'border-blue-brand bg-blue-brand/5 text-navy font-semibold' : 'border-navy/15 text-text-body'
                            }`}
                          >
                            <input 
                              type="checkbox" 
                              checked={formData.services.includes(s.id)}
                              onChange={() => handleCheckboxChange(s.id)}
                              className="mt-0.5 accent-blue-brand w-4 h-4"
                            />
                            {s.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-navy">현재 가장 고민을 알려주세요 <span className="text-gold-brand">*</span>
                        <span className="font-normal text-gray-500 text-xs"> (최대 500자)</span>
                      </label>
                      <textarea 
                        id="concern"
                        value={formData.concern}
                        onChange={handleInputChange}
                        maxLength={500}
                        rows={5}
                        className="w-full px-4 py-3 bg-white border border-navy/15 rounded-xl text-sm focus:border-blue-brand focus:ring-3 focus:ring-blue-brand/10 outline-none transition-all resize-none"
                        placeholder="현재 마케팅과 관련된 고민이나 원하시는 내용을 자유롭게 적어주세요."
                      />
                      <div className="text-right text-[11px] text-gray-500">
                        {formData.concern.length}/500자
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-navy">현재 등록된 플레이스가 있다면 알려주세요</label>
                      <input 
                        type="text" 
                        id="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-navy/15 rounded-xl text-sm focus:border-blue-brand focus:ring-3 focus:ring-blue-brand/10 outline-none transition-all"
                        placeholder="네이버 플레이스 URL 또는 업체명"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4.5 bg-linear-to-r from-navy to-blue-brand text-white rounded-xl text-base font-bold tracking-wider shadow-lg shadow-navy/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy/35 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? '신청 중...' : '무료 상담 신청하기 ✦'}
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 bg-blue-brand/10 rounded-full flex items-center justify-center mx-auto mb-5">
                      <Check className="w-8 h-8 text-blue-brand" />
                    </div>
                    <h4 className="text-xl font-bold text-navy mb-2">상담 신청이 완료되었습니다!</h4>
                    <p className="text-text-body text-sm leading-relaxed mb-8">
                      대표가 직접 확인 후 24시간 내 연락드리겠습니다.<br />
                      조금만 기다려주세요.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-blue-brand font-bold text-sm underline underline-offset-4"
                    >
                      다시 신청하기
                    </button>
                  </motion.div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-14 px-6 text-center">
        <div className="font-serif text-2xl font-black text-white mb-1 tracking-tight">
          고은<span className="text-gold-light">마케팅</span>
        </div>
        <div className="text-xl font-bold text-white mb-4">
          010-6542-3522
        </div>
        <p className="text-xs text-white/40 leading-loose">
          대표 직접 1:1 밀착 마케팅 · 홍보 사이클 전문<br />
          서울특별시 강남구 개포로 15길 3-4<br />
          © 2026 고은마케팅. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
