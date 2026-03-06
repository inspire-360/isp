// ==========================================
// 1. ส่วน Pre-test (แบบทดสอบก่อนเรียน)
// ==========================================
const preTestModule = {
  id: 'module-pretest',
  title: '📌 จุดเริ่มต้น: แบบทดสอบก่อนเรียน (Pre-test)',
  description: 'วัดระดับความรู้พื้นฐานก่อนเข้าสู่บทเรียน (ไม่มีเกณฑ์ผ่าน/ไม่ผ่าน)',
  lessons: [
    {
      id: 'pretest-exam',
      title: 'แบบวัดสมรรถนะครูก่อนการพัฒนา',
      type: 'quiz',
      iconName: 'ClipboardCheck',
      content: {
        isPretest: true,
        passScore: 0,
        questionsCount: 10,
        description: 'แบบทดสอบนี้จัดทำขึ้นเพื่อประเมินความรู้พื้นฐานของท่าน ไม่นำไปคิดคะแนนในการจบหลักสูตร'
      }
    }
  ]
};

const module1PostTestQuestions = [
  {
    id: 'm1-q1',
    question: 'Mission 1 The 9 Dimensions มีเป้าหมายหลักเพื่ออะไร?',
    options: ['เก็บคะแนนระหว่างเรียน', 'รวบรวมข้อมูลบริบทให้ครบทุกมิติเพื่อลด Blind Spots', 'สร้างแบบทดสอบปลายภาค', 'ทำเอกสารส่งผู้บริหาร'],
    correctAnswer: 1
  },
  {
    id: 'm1-q2',
    question: 'ข้อใดคือตรรกะของ SO Strategy ใน TOWS Matrix?',
    options: ['ใช้จุดอ่อนเลี่ยงอุปสรรค', 'ใช้จุดแข็งคว้าโอกาส', 'แก้จุดอ่อนด้วยโอกาส', 'ใช้จุดแข็งรับมืออุปสรรค'],
    correctAnswer: 1
  },
  {
    id: 'm1-q3',
    question: 'Mission 3 กำหนดว่าต้องสร้างกลยุทธ์อย่างน้อยกี่ข้อ?',
    options: ['1 ข้อ', '2 ข้อ', '3 ข้อ', '5 ข้อ'],
    correctAnswer: 2
  },
  {
    id: 'm1-q4',
    question: 'Mission 4 Needs Detective ต้องทำสิ่งใดก่อนสร้าง Action Plan?',
    options: ['สุ่มเลือกกลยุทธ์', 'ให้คะแนนกลยุทธ์และเลือก 1 กลยุทธ์ที่ดีที่สุด', 'ลบ SWOT เดิมทั้งหมด', 'ทำแบบสอบถามซ้ำ'],
    correctAnswer: 1
  },
  {
    id: 'm1-q5',
    question: 'PDCA ใน Mission 5 เริ่มจากขั้นตอนใด?',
    options: ['Check', 'Act', 'Plan', 'Do'],
    correctAnswer: 2
  }
];

// ==========================================
// 2. ส่วนเนื้อหาบทเรียน (Learning Modules 1-5)
// ==========================================
const learningModules = [
  {
    id: 'module-1',
    title: 'Module 1: In-Sight (เปิดตา เปิดใจ ค้นหาความต้องการ)',
    description: 'ครูสามารถวิเคราะห์ปัญหาและความต้องการเชิงพื้นที่ของตนเองและโรงเรียนได้อย่างเป็นระบบ',
    lessons: [
      {
        id: 'm1-overview',
        title: '1.0 Learning Pack: Text / Image / VDO / Presentation / Blog',
        type: 'article',
        iconName: 'FileText',
        content: {
          text: 'บทเรียน Module 1 พาครูสำรวจบริบทจริงผ่าน The 9 Dimensions และแปลงเป็นแผนปฏิบัติการด้วย PDCA',
          imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
          links: [
            { label: 'VDO: In-Sight Introduction', url: 'https://www.youtube.com/watch?v=5MgBikgcWnY' },
            { label: 'Presentation: In-Sight Framework', url: 'https://docs.google.com/presentation/d/1-example' },
            { label: 'Blog: Context-based Needs Assessment', url: 'https://medium.com/' }
          ]
        }
      },
      {
        id: 'm1-insight-lab',
        title: '1.1-1.5 Mission Lab: 9 Dimensions → SWOT → TOWS → Needs Detective → PDCA',
        type: 'activity',
        iconName: 'PenTool',
        activityType: 'insight_lab',
        content: {
          description: 'ทำภารกิจครบ 5 ขั้นตอน พร้อมสร้างหลักฐาน In-Sight Card'
        }
      },
      {
        id: 'm1-posttest',
        title: 'Module 1 Post-test (5 ข้อ, ผ่าน 3 คะแนน)',
        type: 'quiz',
        iconName: 'CheckSquare',
        content: {
          passScore: 3,
          questions: module1PostTestQuestions,
          description: 'ทำแบบทดสอบหลังเรียน Module 1 จำนวน 5 ข้อ ผ่านเกณฑ์ 3 คะแนน'
        }
      },
      {
        id: 'm1-report-card',
        title: 'Module 1 Report Card & In-Sight Badge',
        type: 'report',
        iconName: 'Award',
        content: {
          badgeName: 'In-Sight Badge',
          description: 'สรุปคำตอบจาก Mission Lab + ผล Module 1 Post-test เพื่อปลดล็อก Module 2'
        }
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2: S - Design (ออกแบบฝัน)',
    lessons: [
      { id: 'm2-l1', title: '2.1 ตั้งเป้าหมาย SMART Goal', type: 'video', iconName: 'Video' },
      { id: 'm2-mission', title: 'Mission: My Roadmap', type: 'article', iconName: 'Layout', content: { text: 'กิจกรรมออกแบบเส้นทางการพัฒนาตนเองเชื่อมโยงกับเป้าหมาย OECD 2030' } }
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3: P - PLC (รวมพลัง)',
    lessons: [
      { id: 'm3-l1', title: '3.1 กระบวนการ PLC', type: 'video', iconName: 'Video' },
      { id: 'm3-mission', title: 'Mission: Pitching Idea', type: 'article', iconName: 'Users', content: { text: 'อัดคลิปวิดีโอหรือเสียง นำเสนอไอเดียการแก้ปัญหา' } }
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4: I - Innovation (จุดประกาย)',
    lessons: [
      { id: 'm4-l1', title: '4.1 Innovation Lab', type: 'video', iconName: 'Video' },
      { id: 'm4-mission', title: 'Mission: Lesson Plan', type: 'article', iconName: 'Zap', content: { text: 'เขียนแผนการจัดการเรียนรู้หรือนวัตกรรม' } }
    ]
  },
  {
    id: 'module-5',
    title: 'Module 5: RE - Reflection (สะท้อนผล)',
    lessons: [
      { id: 'm5-l1', title: '5.1 เทคนิค AAR', type: 'video', iconName: 'Video' },
      { id: 'm5-mission', title: 'Mission: Teaching Clip', type: 'article', iconName: 'Video', content: { text: 'ส่งคลิปการสอนจริงในห้องเรียนและบันทึกหลังสอน' } }
    ]
  }
];

const postTestModule = {
  id: 'module-posttest',
  title: '🏁 บทสรุป: แบบทดสอบหลังเรียน (Post-test)',
  description: 'วัดผลสัมฤทธิ์ทางการเรียน (ต้องผ่านเกณฑ์ 80%)',
  lessons: [
    {
      id: 'posttest-exam',
      title: 'แบบวัดสมรรถนะครูหลังการพัฒนา',
      type: 'quiz',
      iconName: 'CheckSquare',
      content: {
        isPosttest: true,
        passScore: 8,
        maxAttempts: 5,
        questionsCount: 10,
        description: 'ข้อสอบจำนวน 10 ข้อ เกณฑ์ผ่าน 8 คะแนน หากไม่ผ่านครบ 5 ครั้ง ท่านจะต้องเริ่มเรียนรู้ใหม่ตั้งแต่ต้น'
      }
    },
    {
      id: 'final-survey',
      title: 'แบบประเมินความพึงพอใจ',
      type: 'article',
      iconName: 'FileText',
      content: {
        text: 'กรุณาตอบแบบประเมินความพึงพอใจเพื่อสะท้อนคุณภาพหลักสูตร และเสนอแนวทางพัฒนารุ่นถัดไป',
        surveyUrl: 'https://forms.gle/example-inspire-survey'
      }
    },
    {
      id: 'final-cert',
      title: 'รับเกียรติบัตร',
      type: 'certificate',
      iconName: 'Award',
      content: {
        text: 'ยินดีด้วย! คุณผ่านการอบรมหลักสูตร InSPIRE for Teacher เรียบร้อยแล้ว สามารถดาวน์โหลดเกียรติบัตรได้ที่นี่'
      }
    }
  ]
};

export const teacherCourseData = {
  id: 'course-teacher',
  title: 'InSPIRE for Teacher: เส้นทางสู่ครูนวัตกร',
  description: 'หลักสูตรพัฒนาครูมืออาชีพผ่านกระบวนการ Design Thinking',
  modules: [preTestModule, ...learningModules, postTestModule]
};
