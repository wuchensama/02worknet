"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import localFont from "next/font/local"
import { useState } from "react"

// 使用与hero-geometric相同的字体
const songFont = localFont({
  src: "../../public/fonts/xinyijixiangsong.ttf",
  variable: "--font-song",
})

const violaFont = localFont({
  src: "../../public/fonts/Violableness.ttf",
  variable: "--font-viola",
})

// 定义项目内容类型
type ProjectContent = {
  images: string[];
  content: string;
  video?: string;
  secondVideo?: string;
  thirdVideo?: string;
  bilibiliIframes?: { src: string; isVertical: boolean }[];
  customVideo?: { src: string; isVertical: boolean };
  fallbackVideo?: string;
};

// 项目卡片组件
function ProjectCard({
  image,
  title,
  description,
  tags,
  delay,
  hasVideo,
  videoSrc
}: {
  image: string
  title: string
  description: string
  tags: string[]
  delay: number
  hasVideo?: boolean
  videoSrc?: string
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [useFallbackVideo, setUseFallbackVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  // 决定是否使用图片而不是背景色
  const useImage = image && !image.includes("project");
  
  // 处理卡片点击
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasVideo) {
      setShowVideo(true);
    } else {
      setShowProjectModal(true);
    }
  };

  // 项目内容数据
  const projectContent: Record<string, ProjectContent> = {
    valentino: {
      images: [
        "/images/kataer01/A53D9521-9F8E-4E2B-8748-3CD83837170C_1_105_c.jpeg",
        "/images/kataer01/9A5F4B24-1911-48F6-B6A2-9C563B391781_1_105_c.jpeg",
        "/images/kataer01/BE9972EE-4F03-4311-927C-708F62CCED56_1_105_c.jpeg",
        "/images/kataer01/E32AD3DD-4BD3-4290-8DDB-A49A893331E8_1_105_c.jpeg",
        "/images/kataer01/C840D2A9-EB52-47AC-BB32-7563DED90FA0_1_105_c.jpeg",
        "/images/kataer01/7B027E22-EE09-488D-BC39-056A7048CAC8.jpeg",
        "/images/kataer01/E0B19C99-44DF-452B-8138-0B792B5D73C3.jpeg",
        "/images/kataer01/FD1331CB-EE8D-4256-893C-ED6FF1288400_1_105_c.jpeg",
        "/images/kataer01/5A37165B-EA91-42D6-B43A-FB4A5A16B2FB_1_105_c.jpeg",
        "/images/kataer01/7B016585-B05B-4E81-B233-40EA40F13E07_1_105_c.jpeg",
      ],
      video: "http://jeyon.test.upcdn.net/%E5%90%8D%E6%B5%81%E4%BC%9A%E9%9B%86%E5%A4%9A%E5%93%88%E5%8D%8E%E4%BC%A6%E5%A4%A9%E5%A5%B4Valentino%E5%85%B8%E8%97%8F%E9%AB%98%E5%AE%9A%E5%B1%95%EF%BC%8C%E4%BD%93%E9%AA%8C%E4%B8%80%E5%9C%BA%E5%A5%A2%E5%8D%8E%E7%9A%84%E8%A7%86%E8%A7%89%E7%9B%9B%E5%AE%B4%20%23%E5%8D%8E%E4%BC%A6%E5%A4%A9%E5%A5%B4%20%23Valentino%20%20%23valentino%E5%8D%8E%E4%BC%A6%E5%A4%A9%E5%A5%B4%20%23%E5%8D%A1%E5%A1%94%E5%B0%94%20%23%E9%AB%98%E7%BA%A7%E6%84%9F%E7%A9%BF%E6%90%AD.mp4",
      fallbackVideo: "/images/kataer01/valentino.mp4",
      content: `卡塔尔王妃御用的"华伦天奴"真的让人爱不释手、这次受邀出席多哈的华伦天奴高定展、200多件的高定作品让我目不暇接、这些裙子似乎都会说话、每一件裙子都有一段故事、或浪漫、或唯美、或天马行空、总之充满着无限可能，也让我叹为观止。

Vanlentino品牌方的安排除了细致周到外，还有就是专属卡塔尔国家的"豪横"，只有皇室可用的豪华餐厅举行晚宴、意大利最顶级的接待团队，还有……关于华伦天奴未完待续的故事`
    },
    xuzhibin: {
      images: [
        "/images/xuzhibin/photo/5F2BF0FF-0112-4748-95E2-C78DE8F35649_1_105_c.jpeg",
        "/images/xuzhibin/photo/72E25273-ABE0-450E-89A3-D9654749445A_1_105_c.jpeg",
        "/images/xuzhibin/photo/84FB93B3-88C0-473C-B8FF-BD97C8222174_1_105_c.jpeg",
        "/images/xuzhibin/photo/330D7515-B9AA-4074-9BFA-9BA52FE5E0FF_1_105_c.jpeg",
        "/images/xuzhibin/photo/A6B50DD2-64E7-4CBA-BC4B-98420DD45C3F_1_105_c.jpeg",
        "/images/xuzhibin/photo/C092EE87-C20B-4915-A294-51EFDF7F70F4_1_105_c.jpeg",
        "/images/xuzhibin/photo/CF386C71-E7EC-41D2-ABD3-9E5D9B08A0A7_1_105_c.jpeg",
        "/images/xuzhibin/photo/D00BC5E7-262E-441A-AEA7-43643B2A8C14_1_105_c.jpeg",
        "/images/xuzhibin/photo/D575B092-B5A4-492C-93B9-7CAC4F91FCC1_1_105_c.jpeg"
      ],
      content: "",
      customVideo: {
        src: "http://jeyon.test.upcdn.net/%E3%80%90MV%E3%80%91%E8%90%A7%E5%B1%B1%E6%A2%A6%E5%A8%9C%E6%96%AF%E5%BA%84%E5%9B%AD-%E5%BE%90%E5%BF%97%E6%96%8C-%E9%BB%91%E7%99%BD%E5%89%AA%E8%BE%91.mp4.h265.nbhd",
        isVertical: false
      }
    },
    mimimi: {
      images: [
        "/images/mimimi/photo/4C6F5D2B-1841-4493-AECF-8A5EF9AEB9A4_1_105_c.jpeg",
        "/images/mimimi/photo/75BA6F2E-8504-49C3-89D2-13836F0AC08B_1_105_c.jpeg",
        "/images/mimimi/photo/677F4D15-64F1-476D-93A9-C8FA87CD8231_1_105_c.jpeg",
        "/images/mimimi/photo/33692D03-A8EF-4A33-BAFB-320D091178F1_1_105_c.jpeg",
        "/images/mimimi/photo/ABF5F09C-0BD1-4BCC-A4E9-524755D31EAD_1_105_c.jpeg",
        "/images/mimimi/photo/C12A261C-8071-44B0-9F50-DFF4D4AC269F_1_105_c.jpeg",
        "/images/mimimi/photo/E8981BFD-8F99-448E-A97D-1C12C529EBA2_1_105_c.jpeg",
        "/images/mimimi/photo/FFF8F8ED-27FD-43CB-BF4E-D1774ACBEBBA_1_105_c.jpeg"
      ],
      video: "/images/mimimi/export_1709354004910.mov",
      secondVideo: "/images/mimimi/export_1709877138778.mov",
      content: ` `
    },
    lulu: {
      images: [
        "/images/lulu/photo/43CC24DC-4AB2-4313-B674-44E108534388_1_105_c.jpeg",
        "/images/lulu/photo/271882EB-A29F-47FE-B6AF-8945BE8144BF_1_105_c.jpeg",
        "/images/lulu/photo/BC8ADADA-2A87-446D-8093-E458A397B70A_1_105_c.jpeg",
        "/images/lulu/photo/1a20a7d2b4984573a0129f1944c65035~tplv-dy-resize-walign-adapt-aq_540_q75.webp"
      ],
      video: "/images/lulu/2.mp4",
      secondVideo: "/images/lulu/3.mp4",
      thirdVideo: "/images/lulu/1.mp4",
      content: ` `
    },
    bvlgari: {
      images: [
        "/images/baogeli75liuyifei/liuyifei.jpeg",
        "/images/baogeli75liuyifei/EB39F360-8044-4477-8B1A-234F9A72F67A_1_105_c.jpeg",
        "/images/baogeli75liuyifei/7B312ACF-9A15-4CDF-9A98-A360FE44E5F4_1_105_c.jpeg",
        "/images/baogeli75liuyifei/B297AD58-530F-4D2D-BF0B-2329752D47B7_1_105_c.jpeg",
        "/images/baogeli75liuyifei/3F9DBFFE-BFE6-43E1-BD1A-75CB03137CFE_1_105_c.jpeg",
        "/images/baogeli75liuyifei/5EA52A67-CF76-4E5B-A8FD-2CC887F3AD52.jpeg",
        "/images/baogeli75liuyifei/A870EF54-1F61-4CEF-8717-5731EE176E81_1_105_c.jpeg",
        "/images/baogeli75liuyifei/BB50C670-472C-404B-898C-02BA9F124108_1_105_c.jpeg",
        "/images/baogeli75liuyifei/D27203AE-995D-40E2-8B42-5203654150FB_1_105_c.jpeg"
      ],
      video: "/images/baogeli75liuyifei/baogeli01.mp4",
      secondVideo: "/images/baogeli75liuyifei/01e41c7009b6520c01037103870f15fd9e_258.mp4",
      content: `踏入BVLGARI 75 周年灵蛇展的现场，仿若进入一个被灵蛇元素编织的奢华梦境。从场馆入口蜿蜒盘旋的灵蛇雕塑，到展厅内陈列的灵蛇主题珠宝，每一处细节都诉说着宝格丽与灵蛇文化跨越时空的不解之缘，彰显着品牌大胆华丽、独具匠心的风格。

作为受邀嘉宾，我有幸见证了这场星光熠熠的盛典。当 "神仙姐姐" 刘亦菲身着一袭优雅礼服，佩戴着宝格丽灵蛇系列珠宝款款走来时，全场瞬间被点亮。她的美与宝格丽珠宝的璀璨交相辉映，将灵蛇的神秘魅惑与女性的柔美坚韧完美融合，让人不禁屏息赞叹。正如她所言，宝格丽的风格华丽而大胆，迸发的力量呼之欲出，将女性多面迷人的魅力展现得淋漓尽致。而她也凭借出众的气质与魅力，当之无愧地被官宣成为宝格丽全球代言人，这一组合，堪称天作之合。

杨洋的现身同样引发热烈欢呼。他佩戴宝格丽男士珠宝，举手投足间尽显优雅绅士风范，硬朗帅气的形象与宝格丽珠宝的精致奢华相得益彰，诠释出宝格丽珠宝在男性魅力塑造上的独特魅力。

在这场盛大的灵蛇展中，200 多件宝格丽灵蛇主题珠宝作品陈列其中，每一件都凝聚着匠人的精湛工艺与创意巧思。灵蛇造型或缠绕于腕间，或盘踞于颈上，灵动的姿态、闪耀的宝石，仿佛赋予了珠宝鲜活的生命力，诉说着一段段关于宝格丽的传奇故事。宝格丽品牌方精心安排的互动环节与高端晚宴，更是让整场活动锦上添花。在觥筹交错间，与众多时尚名流畅谈宝格丽的魅力，感受着品牌 75 年来的深厚底蕴与创新精神。`
    },
    rv: {
      images: [
        "/images/rv zhanglinhe/cb5f0d742d2740db8e72d60e689bace7~tplv-dy-resize-walign-adapt-aq_540_q75.webp",
      ],
      video: "/images/rv zhanglinhe/下载 (1).mp4",
      secondVideo: "/images/rv zhanglinhe/shipin.mp4",
      content: `从巴黎到上海，变的是地理坐标，不变的是 RogerVivier 对极致美学的追求。每一双鞋履都是艺术品，缀满水钻的方扣闪耀着璀璨光芒，丝缎材质在灯光下流转着迷人色泽。品牌方对细节的把控令人惊叹，从装饰设计到材质选择，无不彰显着百年品牌的深厚底蕴。这场活动不仅是视觉盛宴，更是一场关于优雅与时尚的对话，让到场宾客沉浸在 Roger Vivier 构筑的璀璨梦境中，感受着跨越国界的时尚魅力。

此次活动也迎来了明星嘉宾张凌赫，这已是我与他的第三次相遇。现场环境私密，氛围轻松，大家都自在交谈。每次见他，都能发现新变化，演技愈发精湛，气质也更为沉稳，可他礼貌谦逊的特质从未改变，引得在场众人都对他好感满满。他身着品牌服饰，大方自信，在 Roger Vivier 营造的时尚氛围里，尽显独特魅力，也为这场活动增添了别样光彩。

从巴黎到上海，变的是地理坐标，不变的是 Roger Vivier 对极致美学的追求。每一双鞋履都是艺术品，缀满水钻的方扣闪耀着璀璨光芒，丝缎材质在灯光下流转着迷人色泽。品牌方对细节的把控令人惊叹，从装饰设计到材质选择，无不彰显着百年品牌的深厚底蕴。这场活动不仅是视觉盛宴，更是一场关于优雅与时尚的对话，让到场宾客沉浸在 Roger Vivier 构筑的璀璨梦境中，感受着跨越国界的时尚魅力。`
    },
    chaumet: {
      images: [
        "/images/chaumet/c96a842fdf944da79dd869cca785381e~tplv-dy-resize-walign-adapt-aq_540_q75.webp",
        "/images/chaumet/FB41BCD6-EB54-479D-94CA-333F25B050D8_1_105_c.jpeg",
        "/images/chaumet/1F7C2B39-7550-47E8-A5BD-26C6B2E8BA20_1_105_c.jpeg",
        "/images/chaumet/9751D4C6-4F05-412F-BD06-22FD6E42693B_1_105_c.jpeg"
      ],
      video: "/images/chaumet/chaumet01.mp4",
      content: `踏入巴黎 Bagatelle 的巴加特勒城堡，仿佛瞬间穿越进一个被珠宝与星光交织的梦幻世界，这里正在举办 CHAUMET 尚美巴黎的盛大晚宴。这座新古典风格的城堡，自 1905 年马赛尔・普鲁斯特组织派对后，在漫长岁月里一直保持宁静，此次为 CHAUMET 的活动场地，重新焕发出迷人光彩，正规的法国花园、玫瑰园和橘园，都成为了这场盛宴的绝美背景。

作为受邀嘉宾，我置身于这场群星荟萃的盛会之中。现场汇聚了来自全球的 VIC 客户，大家一同漫步在绮丽的自然景致间，欣赏 CHAUMET 全新 Le Jardin de CHAUMET 系列珠宝的璀璨风姿。每一件珠宝都宛如一件稀世艺术品，承载着 CHAUMET 作为自然主义珠宝匠的深厚历史渊源。

晚宴现场，星光熠熠。高圆圆优雅现身，她佩戴的 CHAUMET 珠宝与自身气质完美融合，尽显东方女性的温婉与高贵；车银优的帅气脸庞在珠宝映衬下更加夺目，散发着独属于少年的青春魅力；宋慧乔则展现出一如既往的优雅甜美，CHAUMET 珠宝为她增添了几分神秘的奢华感。他们的到来，让整个晚宴氛围更加热烈。

活动中，我们细细聆听 CHAUMET 的故事，感受品牌在历史长河中传承的匠心与创新。全新系列珠宝与城堡的布置交相辉映，在灯光与自然景色的衬托下，璨然涌动，如同一场珠宝与艺术的对话，揭开了 CHAUMET 发展历程中的崭新篇章。这场晚宴不仅是一场珠宝的视觉盛宴，更是一次深入探索 CHAUMET 文化魅力的难忘之旅，让人沉醉其中，流连忘返。`
    },
    dior: {
      images: [
        "/images/diorgaoding/b4e269c6ec104a34865b17b204a0ce44~tplv-dy-resize-walign-adapt-aq_540_q75.webp",
      ],
      video: "/images/diorgaoding/dior bali.mp4",
      content: `巴黎的雨丝斜斜掠过蒙田大道的梧桐叶，我踩着 Dior 高定工坊门口的青铜门牌纹路，推开那扇缀满时光沉淀的雕花木门。这不是一场简单的时装周看秀，而是与 Christian Dior 先生 "新风貌" 精神跨越时空的重逢 —— 在巴黎时装周间隙，我迎来了 Dior 高定的第二次 Fitting，开启了一场沉浸式的高级定制之旅。

踏入工坊，绣架上流淌着星河般的珠片，银线与丝线交织成的藤蔓正在绣娘的指尖舒展。这次挑选新一季高定，我被邀请参与到面料的灵魂塑造中。从意大利阿尔卑斯山牧场采集的顶级羊绒，到威尼斯古法印染的丝绸，每一块面料都承载着 Dior 对极致的追求。我选用了专属定制面料，细腻的质感仿佛能将巴黎的日光与月光都编织其中。

更令人动容的，是高定团队那些藏在针脚里的温柔。得知我对东方美学情有独钟，他们提前数月从京都古董市场觅得百年宋锦残片，将其解构重塑成独一无二的提花面料。当我抚摸着那上面若隐若现的云纹暗绣，仿佛触摸到了塞纳河畔与东方水墨的奇妙共鸣。从面料甄选到剪裁工艺，每个环节都彰显着 Dior 高定无与伦比的匠心，这些细节如同暗夜星辰，点亮了这场奢华而温暖的高定之旅。`
    },
    diorSnow: {
      images: [
        "/images/dior01/DAF156EA-9E0E-488F-880E-31A2493BC020_1_105_c.jpeg",
        "/images/dior01/64065867-853A-47BC-BA37-4E73D84F8146_1_105_c.jpeg",
        "/images/dior01/5D6F4F38-F62C-4016-991B-A40D99EE0DEC_1_105_c.jpeg"
      ],
      video: "http://jeyon.test.upcdn.net/Dior%20%E6%9D%BE%E8%8A%B1%E6%B9%96%20%E3%80%8C%E5%86%B0%E9%9B%AA%E4%B9%8B%E5%A4%9C%E3%80%8D%E6%99%9A%E5%AE%B4.mp4.h265.nbhd",
      content: `有幸受邀参加 Dior 松花湖王子酒店晚宴，这份殊荣源于全国消费排行前 25 名的身份。踏入酒店的瞬间，仿佛进入了一个被 Dior 美学浸润的梦幻世界，从大堂到宴会厅，每一处细节都彰显着品牌独有的奢华与格调。

步入晚宴现场，Dior 标志性的元素巧妙地融入每一处布置，经典的黑白色调搭配璀璨的灯光，营造出既高贵又浪漫的氛围。200 多件精心陈列的 Dior 高定服饰静静诉说着品牌百年的匠心传承，每一件都宛如艺术品，精湛的剪裁、华丽的面料、细腻的刺绣，或是诉说着巴黎的浪漫风情，或是展现着先锋的时尚理念，令人目不暇接、叹为观止。

此次晚宴，Dior 品牌方的安排堪称极致。连续三天的奢华体验，不仅有专属的时尚沙龙，让我们与设计师面对面交流时尚灵感，还有私人滑雪课程，在松花湖的皑皑白雪间畅享速度与激情。晚宴时分，王子酒店的宴会厅摇身一变，成为了名流汇聚的璀璨舞台。米其林星级厨师团队精心烹制的法式珍馐，搭配顶级酒庄的佳酿，每一口都是味觉与视觉的双重盛宴。席间，与许久未见的老朋友相谈甚欢，共同沉浸在这无与伦比的 Dior 世界中。这场晚宴，不仅是一场时尚的盛会，更是一段镌刻在记忆中的璀璨时光，Dior 的奢华与魅力，在此刻展现得淋漓尽致。`
    }
  };

  // 获取当前项目内容
  const getProjectContent = () => {
    if (title.includes("Valentino")) return projectContent.valentino;
    if (title.includes("徐志滨")) return projectContent.xuzhibin;
    if (title.includes("秘秘")) return projectContent.mimimi;
    if (title.includes("lulu")) return projectContent.lulu;
    if (title.includes("宝格丽")) return projectContent.bvlgari;
    if (title.includes("Roger Vivier")) return projectContent.rv;
    if (title.includes("CHAUMET")) return projectContent.chaumet;
    if (title.includes("蒙田大道")) return projectContent.dior;
    if (title.includes("松花湖")) return projectContent.diorSnow;
    return null;
  };

  const currentContent = getProjectContent();

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <a href="#" className="block" onClick={handleCardClick}>
        <div className="overflow-hidden rounded-lg">
          <div className="relative aspect-[3/4] w-full">
            {/* 图片或占位背景 */}
            {useImage ? (
              <img 
                src={image} 
                alt={title}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br",
                title.includes("Valentino") ? "from-rose-800/40 to-rose-950/70" :
                title.includes("dior") ? "from-blue-800/40 to-blue-950/70" :
                title.includes("达人") ? "from-purple-800/40 to-purple-950/70" :
                "from-amber-800/40 to-amber-950/70"
              )} />
            )}
            
            {/* 保持渐变蒙版，确保在图片之上 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            
            {/* 内容区域 */}
            <div className="absolute bottom-0 left-0 z-20 p-5 w-full">
              <h3 className="text-xl md:text-2xl font-medium text-white mb-2">{title}</h3>
              <p className="text-sm text-white/70 font-song mb-3 line-clamp-2">
                {description}
              </p>
              
              {/* 标签和详情按钮并排排列 */}
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span key={index} className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* 扁平线条风按钮，字体更小，与标签并排 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center text-xs text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <span className="border-b border-orange-400 pb-0.5 mr-1">查看详情</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </motion.div>

      {/* 视频播放弹窗 */}
      {showVideo && videoSrc && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowVideo(false)}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.19, 1.0, 0.22, 1.0],
              opacity: { duration: 0.2 }
            }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
              <video 
                src={useFallbackVideo ? currentContent?.fallbackVideo! : currentContent?.video!}
                poster={currentContent?.images?.[0]}
                controls
                playsInline
                loop
                autoPlay
                muted={false}
                className="w-full h-full object-cover"
                onError={() => {
                  if (!useFallbackVideo) {
                    setUseFallbackVideo(true);
                  }
                }}
                onLoadedData={(e) => {
                  const video = e.currentTarget;
                  // 如果3秒后视频仍未播放，切换到备用视频
                  setTimeout(() => {
                    if (video.readyState < 3 && !useFallbackVideo) {
                      setUseFallbackVideo(true);
                    }
                  }, 3000);
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 项目弹窗 */}
      {showProjectModal && currentContent && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setShowProjectModal(false)}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.19, 1.0, 0.22, 1.0],
              opacity: { duration: 0.2 }
            }}
            className="relative w-full max-w-6xl bg-[#0a0a0a] rounded-2xl shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button 
              className="absolute top-4 right-4 z-50 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors"
              onClick={() => setShowProjectModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative">
              {/* 背景效果 */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[30%] right-0 w-[90%] h-[90%] rounded-full bg-gradient-to-br from-rose-500/20 via-amber-600/10 to-transparent blur-[120px] opacity-60" />
                <div className="absolute -bottom-[30%] left-0 w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-rose-700/10 via-amber-500/5 to-transparent blur-[100px] opacity-40" />
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
              </div>

              <div className="relative z-10 p-8">
                {/* 标题部分 */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-white/90 leading-tight mr-3">
                      {title}
                    </h2>
                    {title.includes("徐志滨") && (
                      <a 
                        href="https://v.douyin.com/-uVYA3-GjJQ/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-3 py-1 text-sm text-white/70 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                      >
                        主页
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {title.includes("秘秘") && (
                      <a 
                        href="https://v.douyin.com/gYCz1Jlc1eQ/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-3 py-1 text-sm text-white/70 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                      >
                        主页
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {title.includes("lulu") && (
                      <a 
                        href="https://www.xiaohongshu.com/user/profile/5cf118f4000000000502723a?xsec_token=YB2TtYKRMD54DwdDdLAH8pV_67Jcyc30vPk00K3vQZLKw=&xsec_source=app_share&xhsshare=CopyLink&appuid=5e200cee00000000010030e6&apptime=1745587217&share_id=2d9dc5b1134346768bf29f633befc3f5" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-3 py-1 text-sm text-white/70 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                      >
                        主页
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-white/60 font-song text-lg">
                    {description}
                  </p>
                </div>

                {/* 顶部图片 - 仅对徐志滨项目显示 */}
                {title.includes("徐志滨") && (
                  <div className="mb-8">
                    <img 
                      src="/images/xuzhibin/xuzhibin.PNG" 
                      alt="徐志滨"
                      className="w-full h-auto rounded-lg shadow-xl"
                    />
                  </div>
                )}

                {/* 顶部图片 - 仅对秘秘项目显示 */}
                {title.includes("秘秘") && (
                  <div className="mb-8">
                    <img 
                      src="/images/mimimi/mimi.PNG" 
                      alt="秘秘"
                      className="w-full h-auto rounded-lg shadow-xl"
                    />
                  </div>
                )}

                {/* 顶部图片 - 仅对lulu项目显示 */}
                {title.includes("lulu") && (
                  <div className="mb-8">
                    <img 
                      src="/images/lulu/lulu.PNG" 
                      alt="lulu"
                      className="w-full h-auto rounded-lg shadow-xl"
                    />
                  </div>
                )}

                {/* 视频部分 - 只对有视频的项目显示 */}
                {currentContent?.video && (
                  <div className="mb-8 mx-auto" style={{ maxWidth: "450px" }}>
                    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black/30 shadow-xl">
                      <video 
                        src={useFallbackVideo ? currentContent?.fallbackVideo! : currentContent?.video!}
                        poster={currentContent?.images?.[0]}
                        controls
                        playsInline
                        loop
                        autoPlay
                        muted={false}
                        className="w-full h-full object-cover"
                        onError={() => {
                          if (!useFallbackVideo) {
                            setUseFallbackVideo(true);
                          }
                        }}
                        onLoadedData={(e) => {
                          const video = e.currentTarget;
                          // 如果3秒后视频仍未播放，切换到备用视频
                          setTimeout(() => {
                            if (video.readyState < 3 && !useFallbackVideo) {
                              setUseFallbackVideo(true);
                            }
                          }, 3000);
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* 第二个视频 */}
                {currentContent && currentContent.secondVideo && (
                  <div className="mb-8 mx-auto" style={{ maxWidth: "450px" }}>
                    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black/30 shadow-xl">
                      <video 
                        src={currentContent.secondVideo}
                        controls
                        playsInline
                        loop
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* 第三个视频 - 仅对有第三个视频的项目显示 */}
                {currentContent && currentContent.thirdVideo && (
                  <div className="mb-8 mx-auto" style={{ maxWidth: "450px" }}>
                    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black/30 shadow-xl">
                      <video 
                        src={currentContent.thirdVideo}
                        controls
                        playsInline
                        loop
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* 徐志滨卡片：显示自定义视频 */}
                {title.includes("徐志滨") && currentContent.customVideo && (
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div
                        className="relative"
                        style={{
                          aspectRatio: currentContent.customVideo.isVertical ? '9/16' : '16/9',
                          maxHeight: window.innerWidth < 768 ? '80vh' : 'none'
                        }}
                      >
                        <video
                          src={currentContent.customVideo.src}
                          controls
                          playsInline
                          className="absolute inset-0 w-full h-full rounded-lg shadow-lg bg-black"
                          preload="auto"
                          onLoadedData={e => {
                            const video = e.currentTarget;
                            video.currentTime = 0.01;
                            setTimeout(() => video.pause(), 100);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 其他卡片正常显示正文 */}
                {!title.includes("徐志滨") && (
                  <div className="mb-8">
                    <div className="prose prose-lg prose-invert max-w-none">
                      <p className="text-lg text-white/80 leading-relaxed mb-4 font-song whitespace-pre-line">
                        {currentContent.content}
                      </p>
                    </div>
                  </div>
                )}

                {/* 图片网格 */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentContent.images.map((src, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="overflow-hidden rounded-lg cursor-pointer"
                    >
                      <img 
                        src={src} 
                        alt={`${title}图片 ${index + 1}`}
                        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* 返回按钮 */}
                <div className="mt-8 flex justify-between items-center pt-6 border-t border-white/10">
                  <button 
                    onClick={() => setShowProjectModal(false)}
                    className="flex items-center text-white/60 hover:text-white transition-colors group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    <span>返回</span>
                  </button>
                  
                  <div className="text-white/40 text-sm">
                    © {new Date().getFullYear()} 摄影师嘉阳
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

// 分类标题组件
function CategoryTitle({ title, colorClass }: { title: string, colorClass: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-8 md:mb-12 max-w-4xl"
    >
      <div className="flex items-center gap-4 mb-5">
        <div className={cn("w-2 h-16 rounded-full", colorClass)} />
        <h3 className="text-3xl md:text-4xl font-bold text-white/90">
          「{title}」
        </h3>
      </div>
    </motion.div>
  );
}

// 精选项目板块组件
export default function ProjectsSection() {
  const [visibleCardCount, setVisibleCardCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 品牌翻译官项目
  const brandProjects = [
    {
      image: "/images/kataer01/A53D9521-9F8E-4E2B-8748-3CD83837170C_1_105_c.jpeg",
      title: "卡塔尔Valentino拍摄",
      description: "受邀参加多哈Valentino高定展，拍摄华伦天奴王妃御用的高定与晚宴",
      tags: ["Valentino", "品牌拍摄"],
    },
    {
      image: "/images/baogeli75liuyifei/liuyifei.jpeg",
      title: "宝格丽75周年&刘亦菲",
      description: "宝格丽 75 周年灵蛇展：璀璨之夜，星耀灵蛇",
      tags: ["BVLGARI", "刘亦菲"],
    },
    {
      image: "/images/rv zhanglinhe/cb5f0d742d2740db8e72d60e689bace7~tplv-dy-resize-walign-adapt-aq_540_q75.webp",
      title: "Roger Vivier 璀璨之夜",
      description: "受邀参加RV的璀璨之夜活动",
      tags: ["Roger Vivier", "张凌赫"],
    },
    {
      image: "/images/chaumet/c96a842fdf944da79dd869cca785381e~tplv-dy-resize-walign-adapt-aq_540_q75.webp",
      title: "巴黎 CHAUMET 晚宴",
      description: "星光与珠宝的绮梦之约",
      tags: ["CHAUMET", "高圆圆"],
    },
    {
      image: "/images/diorgaoding/b4e269c6ec104a34865b17b204a0ce44~tplv-dy-resize-walign-adapt-aq_540_q75.webp",
      title: "蒙田大道上的高定绮梦",
      description: "与 Dior 的浪漫美学对话",
      tags: ["蒙田大道", "fitting"],
    },
    {
      image: "/images/dior01/DAF156EA-9E0E-488F-880E-31A2493BC020_1_105_c.jpeg",
      title: "松花湖dior",
      description: "定格迪奥品牌时装周画面，捕捉光影中的奢华美学",
      tags: ["Dior", "品牌拍摄"],
    },
  ];
  
  // 孵化操盘手项目
  const incubationProjects = [
    {
      title: "徐志滨",
      description: "合作拍摄剪辑多次万达集团旗下吃喝玩乐内容",
      image: "/images/xuzhibin/photo/330D7515-B9AA-4074-9BFA-9BA52FE5E0FF_1_105_c.jpeg",
      tags: ["艺人", "137w粉丝"],
      expandedContent: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="aspect-video">
              <iframe
                src="//player.bilibili.com/player.html?isOutside=true&aid=114404339222779&bvid=BV1ptLozsEmG&cid=29626928899&p=1"
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                className="w-full h-full"
              />
            </div>
            <div className="aspect-video">
              <iframe
                src="//player.bilibili.com/player.html?isOutside=true&aid=114404355998846&bvid=BV1WxLozdEDU&cid=29626928801&p=1"
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                className="w-full h-full"
              />
            </div>
            <div className="aspect-video">
              <iframe
                src="//player.bilibili.com/player.html?isOutside=true&aid=114404355999466&bvid=BV1WxLozdEZB&cid=29626994373&p=1"
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                className="w-full h-full"
              />
            </div>
            <div className="aspect-video">
              <iframe
                src="//player.bilibili.com/player.html?isOutside=true&aid=114404356066504&bvid=BV1CxLozdE6R&cid=29626993601&p=1"
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      image: "/images/mimimi/photo/FFF8F8ED-27FD-43CB-BF4E-D1774ACBEBBA_1_105_c.jpeg",
      title: "秘秘",
      description: "",
      tags: ["颜值主播", "344万粉丝"],
    },
    {
      image: "/images/lulu/photo/1a20a7d2b4984573a0129f1944c65035~tplv-dy-resize-walign-adapt-aq_540_q75.webp",
      title: "高定女王lulu",
      description: "多次拍摄高定fitting和品牌VIC活动",
      tags: ["时尚KOL", "粉丝21.1万"],
    },
  ];
  
  // 技术流创作项目
  const technicalProjects = [
    {
      image: "/images/project7.jpg",
      title: "企业宣传片拍摄",
      description: "专业电影级设备与技术打造企业形象宣传片",
      tags: ["宣传片", "企业形象"],
    },
  ];

  // 微电影项目
  const filmProjects = [
    {
      image: "/images/mimi/1040g34o31fnh7vmv7k004a05tmdltt699861s4g.jpeg",
      title: "《秘密》微电影",
      description: "风云突变，境外黑手伸向企业核心机密！",
      tags: ["宁波市国际微电影节", "宁波海曙区保密局"],
      hasVideo: true,
      videoSrc: "//player.bilibili.com/player.html?isOutside=true&aid=201793186&bvid=BV1Ah411o7XT&cid=228634799&p=1"
    },
    {
      image: "/images/mimi/IMG_9036.JPG",
      title: "《奶奶的药箱》",
      description: "关于我和奶奶的故事",
      tags: ["宁波国医堂"],
      hasVideo: true,
      videoSrc: "//player.bilibili.com/player.html?isOutside=true&aid=371871993&bvid=BV1SZ4y1K7C5&cid=228638294&p=1"
    },
    {
      image: "/images/mimi/IMG_9037.JPG",
      title: "《黄古林草席》",
      description: "透过纪录片视角，领略黄古林草席申遗的魅力",
      tags: ["纪录片", "非遗传承"],
      hasVideo: true,
      videoSrc: "//player.bilibili.com/player.html?isOutside=true&aid=329346217&bvid=BV1MA411n7RF&cid=228627688&p=1"
    },
    {
      image: "/images/mimi/IMG_9039.JPG",
      title: "《钱海军》",
      description: "十四届人大代表，便民服务与工艺领航人，钱海军",
      tags: ["人物纪录片", "人大代表"],
      hasVideo: true,
      videoSrc: "//player.bilibili.com/player.html?isOutside=true&aid=839344075&bvid=BV1v54y1U7ZF&cid=228694614&p=1"
    }
  ];

  const handleToggleView = () => {
    if (isExpanded) {
      setVisibleCardCount(3);
      setIsExpanded(false);
    } else {
      setVisibleCardCount(brandProjects.length);
      setIsExpanded(true);
    }
  };

  return (
    <section id="projects" className={`relative min-h-screen w-full flex flex-col py-32 overflow-hidden bg-[#0c0c0c] ${songFont.variable} ${violaFont.variable}`}>
      {/* 删除了暖色调背景渐变部分 */}
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* 标题部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 max-w-4xl"
        >
          <h2 className="text-7xl md:text-8xl font-serif text-white/90 leading-tight mb-8">
            精选项目
          </h2>
          <p className="text-white/60 max-w-xl font-song text-sm md:text-base">
            镜头记录奢华，艺术塑造品牌。每一个项目都是独特视觉语言的呈现，将品牌理念通过光影与色彩完美诠释。
          </p>
        </motion.div>
        
        {/* 品牌视觉翻译官部分 */}
        <div className="mb-24">
          <div data-section-target="creators-title">
            <CategoryTitle 
              title="品牌视觉" 
              colorClass="bg-gradient-to-b from-rose-400 to-rose-600" 
            />
          </div>
          
          <div className="mb-8">
            <p className="text-white/60 max-w-3xl font-song text-sm md:text-base leading-relaxed">
              曾为<span className="font-medium text-white/80">Dior</span>、<span className="font-medium text-white/80">Valentino</span>定格时装周画面，为<span className="font-medium text-white/80">迪丽热巴</span>、<span className="font-medium text-white/80">刘亦菲</span>等一线明星雕刻活动切片。足迹横跨<span className="font-medium text-white/80">8国10城</span>，主导<span className="font-medium text-white/80">5次跨国拍摄项目</span>，将多哈皇室的奢华、意大利米兰的时尚底色、巴黎左岸的浪漫风情熔铸成品牌专属的全球化视觉符号。
            </p>
          </div>
          
          {/* 品牌项目网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {brandProjects.slice(0, visibleCardCount).map((project, index) => (
              <ProjectCard
                key={index}
                image={project.image}
                title={project.title}
                description={project.description}
                tags={project.tags}
                delay={0.2 + index * 0.1}
                hasVideo={false}
              />
            ))}
          </div>

          {/* 展开/收起按钮 */}
          {brandProjects.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center mt-10"
            >
              <button 
                onClick={handleToggleView}
                className="group relative px-8 py-3 text-sm font-medium text-white overflow-hidden rounded-full transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  {isExpanded ? "收起" : "查看更多"}
                  {isExpanded ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              </button>
            </motion.div>
          )}
        </div>
        
        {/* 0-1孵化操盘手部分 */}
        <div id="creators" className="mb-24">
          <div data-section-target="creators-title">
            <CategoryTitle 
              title="短视频拍摄运营" 
              colorClass="bg-gradient-to-b from-indigo-400 to-indigo-600" 
            />
          </div>
          
          <div className="mb-8">
            <p className="text-white/60 max-w-3xl font-song text-sm md:text-base leading-relaxed">
              <span className="font-medium text-white/80">合作过徐志滨</span>、<span className="font-medium text-white/80">秘秘</span>、<span className="font-medium text-white/80">lulu</span>、<span className="font-medium text-white/80">米粒mili</span>、<span className="font-medium text-white/80">张林超</span>等账号拍摄，创作出<span className="font-medium text-white/80">30+</span>百万流量爆款视频。
            </p>
          </div>
          
          {/* 孵化项目网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" data-section-target="creators-grid">
            {incubationProjects.map((project, index) => (
              <ProjectCard
                key={index}
                image={project.image}
                title={project.title}
                description={project.description}
                tags={project.tags}
                delay={0.2 + index * 0.1}
                hasVideo={false}
              />
            ))}
          </div>
        </div>
        
        {/* 技术流创作者部分 */}
        <div id="shorts" className="mb-24">
          <div data-section-target="shorts-title">
            <CategoryTitle 
              title="短剧 | 微电影拍摄" 
              colorClass="bg-gradient-to-b from-amber-400 to-amber-600" 
            />
          </div>
          
          <div className="mb-8">
            <p className="text-white/60 max-w-3xl font-song text-sm md:text-base leading-relaxed">
              <span className="font-medium text-white/80">达芬奇官方认证调色师</span>，精通<span className="font-medium text-white/80">Sony/Cannon</span>电影机及前后期全流程、无人机航拍系统。<span className="font-medium text-white/80">7年行业深耕</span>，镜头的终极命题，是让每一帧都成为艺术创作的璀璨结晶。
            </p>
          </div>
          
          {/* 技术项目网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" data-section-target="shorts-grid">
            {filmProjects.slice(0, visibleCardCount).map((project, index) => (
              <ProjectCard
                key={index}
                image={project.image}
                title={project.title}
                description={project.description}
                tags={project.tags}
                delay={isExpanded ? 0.1 : 0.2 + index * 0.1}
                hasVideo={project.hasVideo}
                videoSrc={project.videoSrc}
              />
            ))}
          </div>
          
          {/* 查看更多/收起按钮 */}
          {filmProjects.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center mt-10"
            >
              <button 
                onClick={handleToggleView}
                className="group relative px-8 py-3 text-sm font-medium text-white overflow-hidden rounded-full transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  {isExpanded ? "收起" : "查看更多"}
                  {isExpanded ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
} 