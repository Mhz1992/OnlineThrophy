import { NextResponse } from 'next/server';
import { TrophySession } from '@/types/api'; // Removed SessionStatus

const FARSI_VOICE_SAMPLES_BASE_URL = "http://farsi.voiceoversamples.com/";
const FARSI_VOICE_SAMPLE_PATHS = [
    "Farsi_Female_Ghaemizade.mp3",
    "Farsi_Female_Poormahdi.mp3",
    "Farsi_Female_Rooshenas.mp3",
    "Farsi_Male_Golzadeh.mp3",
    "Farsi_Male_Hoseinzaadeh.mp3",
];

// Helper function to generate a UUID
function generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const getRandomVoiceSample = () => {
    const randomIndex = Math.floor(Math.random() * FARSI_VOICE_SAMPLE_PATHS.length);
    const filePath = FARSI_VOICE_SAMPLE_PATHS[randomIndex];
    const externalUrl = `${FARSI_VOICE_SAMPLES_BASE_URL}${filePath}`;
    // Return the URL to the new proxy API route, encoding the external URL
    return `/api/voice-proxy?url=${encodeURIComponent(externalUrl)}`;
};

// Updated MOCK_SESSION_DATA to use UUIDs for IDs and static slugs for consistency with home page
const MOCK_SESSION_DATA: TrophySession[] = [
    {
        id: generateUuid(),
        slug: 'therapy-intro', // Matched slug from home/route.ts
        title: 'آشنایی با روان‌درمانی',
        description: 'جلسه اول: معرفی روش‌ها و اهداف درمان',
        status: 'open', // Example status
        contents: [
            {
                id: generateUuid(),
                type: 'video',
                title: 'ویدئو معرفی روان‌درمانی',
                value: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                link: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'صوت: خوش آمدید به جلسه اول',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
            {
                id: generateUuid(),
                type: 'text',
                title: 'مقدمه‌ای بر روان‌درمانی',
                value: 'روان‌درمانی فرآیندی است که در آن افراد با کمک یک متخصص سلامت روان، به بررسی و حل مشکلات عاطفی، فکری و رفتاری خود می‌پردازند. این روش به افراد کمک می‌کند تا الگوهای فکری و رفتاری ناسالم را شناسایی کرده و تغییر دهند، مهارت‌های مقابله‌ای جدیدی بیاموزند و به درک عمیق‌تری از خود دست یابند.',
                description: 'روان‌درمانی فرآیندی است که در آن افراد با کمک یک متخصص سلامت روان، به بررسی و حل مشکلات عاطفی، فکری و رفتاری خود می‌پردازند. این روش به افراد کمک می‌کند تا الگوهای فکری و رفتاری ناسالم را شناسایی کرده و تغییر دهند، مهارت‌های مقابله‌ای جدیدی بیاموزند و به درک عمیق‌تری از خود دست یابند.',
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'صوت: اهمیت خودآگاهی',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
            {
                id: generateUuid(),
                type: 'text',
                title: 'اهداف اصلی روان‌درمانی',
                value: 'اهداف روان‌درمانی می‌تواند شامل کاهش علائم اختلالات روانی، بهبود روابط بین‌فردی، افزایش خودآگاهی، تقویت مهارت‌های حل مسئله، و ارتقاء کیفیت کلی زندگی باشد. هر جلسه درمانی به صورت هدفمند و با توجه به نیازهای فردی مراجع پیش می‌رود.',
                description: 'اهداف روان‌درمانی می‌تواند شامل کاهش علائم اختلالات روانی، بهبود روابط بین‌فردی، افزایش خودآگاهی، تقویت مهارت‌های حل مسئله، و ارتقاء کیفیت کلی زندگی باشد. هر جلسه درمانی به صورت هدفمند و با توجه به نیازهای فردی مراجع پیش می‌رود.',
            },
            {
                id: generateUuid(),
                type: 'video',
                title: 'چگونه روان‌درمانی به شما کمک می‌کند؟',
                value: 'https://www.youtube.com/embed/y6120QO_o_o',
                link: 'https://www.youtube.com/embed/y6120QO_o_o',
            },
        ],
    },
    {
        id: generateUuid(),
        slug: 'anxiety-management', // Matched slug from home/route.ts
        title: 'درک اضطراب و مدیریت آن',
        description: 'جلسه دوم: شناخت اضطراب و تمرین‌های آرام‌سازی',
        status: 'locked', // Example status
        contents: [
            {
                id: generateUuid(),
                type: 'text',
                title: 'اضطراب چیست؟',
                value: 'اضطراب یک واکنش طبیعی بدن به استرس است. این احساس می‌تواند شامل نگرانی, ترس یا تنش باشد. در حد متعادل, اضطراب می‌تواند مفید باشد و به ما کمک کند تا در موقعیت‌های خطرناک هوشیار باشیم. اما اضطراب بیش از حد می‌تواند زندگی روزمره را مختل کند.',
                description: 'اضطراب یک واکنش طبیعی بدن به استرس است. این احساس می‌تواند شامل نگرانی, ترس یا تنش باشد. در حد متعادل, اضطراب می‌تواند مفید باشد و به ما کمک کند تا در موقعیت‌های خطرناک هوشیار باشیم. اما اضطراب بیش از حد می‌تواند زندگی روزمره را مختل کند.',
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'صوت: تمرین تنفس برای آرامش',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
            {
                id: generateUuid(),
                type: 'video',
                title: 'تکنیک‌های آرام‌سازی برای اضطراب',
                value: 'https://www.youtube.com/embed/hJ_6y7_002Q',
                link: 'https://www.youtube.com/embed/hJ_6y7_002Q',
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'صوت: مدیتیشن کوتاه برای کاهش استرس',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
            {
                id: generateUuid(),
                type: 'text',
                title: 'راهکارهای مقابله با اضطراب',
                value: 'برای مدیریت اضطراب، می‌توانید از راهکارهایی مانند تمرینات تنفس عمیق، مدیتیشن، ورزش منظم، تغذیه سالم، و محدود کردن مصرف کافئین و الکل استفاده کنید. همچنین، صحبت با یک متخصص می‌تواند بسیار کمک‌کننده باشد.',
                description: 'برای مدیریت اضطراب، می‌توانید از راهکارهایی مانند تمرینات تنفس عمیق، مدیتیشن، ورزش منظم، تغذیه سالم، و محدود کردن مصرف کافئین و الکل استفاده کنید. همچنین، صحبت با یک متخصص می‌تواند بسیار کمک‌کننده باشد.',
            },
        ],
    },
    {
        id: generateUuid(),
        slug: 'self-esteem', // Matched slug from home/route.ts
        title: 'تقویت عزت‌نفس',
        description: 'جلسه سوم: خودشناسی و پذیرش خود',
        status: 'viewed', // Example status
        contents: [
            {
                id: generateUuid(),
                type: 'voice',
                title: 'مقدمه و تنفس عمیق',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
            {
                id: generateUuid(),
                type: 'text',
                title: 'فواید ذهن‌آگاهی',
                value: 'ذهن‌آگاهی به شما کمک می‌کند تا در لحظه حال زندگی کنید و از افکار و احساسات خود آگاه باشید. این تمرین می‌تواند استرس را کاهش دهد، تمرکز را افزایش دهد و به بهبود سلامت روان کمک کند.',
                description: 'ذهن‌آگاهی به شما کمک می‌کند تا در لحظه حال زندگی کنید و از افکار و احساسات خود آگاه باشید. این تمرین می‌تواند استرس را کاهش دهد، تمرکز را افزایش دهد و به بهبود سلامت روان کمک کند.',
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'اسکن بدن و آرامش',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'پایان تمرین',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
        ],
    },
    {
        id: generateUuid(),
        slug: 'relationships', // Matched slug from home/route.ts
        title: 'مدیریت روابط بین‌فردی',
        description: 'جلسه چهارم: مهارت‌های ارتباط مؤثر',
        status: 'open', // Example status
        contents: [
            {
                id: generateUuid(),
                type: 'voice',
                title: 'آغاز سفر درونی',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
            {
                id: generateUuid(),
                type: 'text',
                title: 'آمادگی برای مدیتیشن',
                value: 'لطفاً در مکانی آرام بنشینید یا دراز بکشید. چشمان خود را به آرامی ببندید و تمام توجه خود را به نفس‌هایتان معطوف کنید. اجازه دهید هرگونه تنش از بدنتان خارج شود.',
                description: 'لطفاً در مکانی آرام بنشینید یا دراز بکشید. چشمان خود را به آرامی ببندید و تمام توجه خود را به نفس‌هایتان معطوف کنید. اجازه دهید هرگونه تنش از بدنتان خارج شود.',
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'مدیتیشن هدایت‌شده: آرامش ذهن',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
            {
                id: generateUuid(),
                type: 'text',
                title: 'بازتاب و یادداشت‌برداری',
                value: 'پس از اتمام مدیتیشن، چند لحظه در سکوت بمانید. سپس، احساسات و افکاری که در طول تمرین تجربه کردید را یادداشت کنید. این کار به شما کمک می‌کند تا از پیشرفت خود آگاه شوید.',
                description: 'پس از اتمام مدیتیشن، چند لحظه در سکوت بمانید. سپس، احساسات و افکاری که در طول تمرین تجربه کردید را یادداشت کنید. این کار به شما کمک می‌کند تا از پیشرفت خود آگاه شوید.',
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'پایان جلسه و قدردانی',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
        ],
    },
    {
        id: generateUuid(),
        slug: 'mindfulness', // Matched slug from home/route.ts
        title: 'تنفس و آرام‌سازی ذهن',
        description: 'جلسه پنجم: تمرین‌های تنفس عمیق و ذهن‌آگاهی',
        status: 'locked',
        contents: [
            {
                id: generateUuid(),
                type: 'text',
                title: 'مقدمه بر تنفس عمیق',
                value: 'تنفس عمیق یکی از ساده‌ترین و موثرترین روش‌ها برای کاهش استرس و اضطراب است. با تمرکز بر نفس‌های خود، می‌توانید سیستم عصبی خود را آرام کنید و به حالت آرامش برسید.',
                description: 'تنفس عمیق یکی از ساده‌ترین و موثرترین روش‌ها برای کاهش استرس و اضطراب است. با تمرکز بر نفس‌های خود، می‌توانید سیستم عصبی خود را آرام کنید و به حالت آرامش برسید.',
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'تمرین تنفس شکمی',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
            {
                id: generateUuid(),
                type: 'video',
                title: 'آموزش تنفس عمیق',
                value: 'https://www.youtube.com/embed/aXIt0iLsMpM',
                link: 'https://www.youtube.com/embed/aXIt0iLsMpM',
            },
        ],
    },
    {
        id: generateUuid(),
        slug: 'emotion-regulation', // Matched slug from home/route.ts
        title: 'کنترل خشم و احساسات',
        description: 'جلسه ششم: مدیریت واکنش‌های هیجانی',
        status: 'locked',
        contents: [
            {
                id: generateUuid(),
                type: 'text',
                title: 'شناخت خشم',
                value: 'خشم یک احساس طبیعی است، اما نحوه مدیریت آن می‌تواند بر زندگی شما تأثیر بگذارد. شناخت محرک‌ها و الگوهای خشم اولین قدم برای کنترل آن است.',
                description: 'خشم یک احساس طبیعی است، اما نحوه مدیریت آن می‌تواند بر زندگی شما تأثیر بگذارد. شناخت محرک‌ها و الگوهای خشم اولین قدم برای کنترل آن است.',
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'تکنیک‌های آرام‌سازی در لحظه خشم',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
            {
                id: generateUuid(),
                type: 'video',
                title: 'مدیریت خشم',
                value: 'https://www.youtube.com/embed/BsQ_g_2y50Q',
                link: 'https://www.youtube.com/embed/BsQ_g_2y50Q',
            },
        ],
    },
    {
        id: generateUuid(),
        slug: 'healthy-habits', // Matched slug from home/route.ts
        title: 'یادگیری رفتارهای سالم',
        description: 'جلسه هفتم: جایگزین‌سازی عادات منفی',
        status: 'locked',
        contents: [
            {
                id: generateUuid(),
                type: 'text',
                title: 'ساخت عادات مثبت',
                value: 'ایجاد عادات سالم به تدریج و با پشتکار امکان‌پذیر است. با شناسایی عادات منفی و جایگزینی آن‌ها با رفتارهای مثبت، می‌توانید کیفیت زندگی خود را بهبود بخشید.',
                description: 'ایجاد عادات سالم به تدریج و با پشتکار امکان‌پذیر است. با شناسایی عادات منفی و جایگزینی آن‌ها با رفتارهای مثبت، می‌توانید کیفیت زندگی خود را بهبود بخشید.',
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'برنامه‌ریزی برای تغییر',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
        ],
    },
    {
        id: generateUuid(),
        slug: 'therapy-review', // Matched slug from home/route.ts
        title: 'مرور و جمع‌بندی مسیر درمان',
        description: 'جلسه هشتم: مرور پیشرفت‌ها و برنامه ادامه درمان',
        status: 'locked',
        contents: [
            {
                id: generateUuid(),
                type: 'text',
                title: 'مرور پیشرفت‌ها',
                value: 'در این جلسه، به مرور تمام پیشرفت‌هایی که در طول جلسات گذشته داشته‌اید، می‌پردازیم. این کار به شما کمک می‌کند تا نقاط قوت خود را بشناسید و برای آینده برنامه‌ریزی کنید.',
                description: 'در این جلسه، به مرور تمام پیشرفت‌هایی که در طول جلسات گذشته داشته‌اید، می‌پردازیم. این کار به شما کمک می‌کند تا نقاط قوت خود را بشناسید و برای آینده برنامه‌ریزی کنید.',
            },
            {
                id: generateUuid(),
                type: 'voice',
                title: 'برنامه‌ریزی برای آینده',
                value: getRandomVoiceSample(),
                link: getRandomVoiceSample(),
            },
        ],
    },
];

export async function GET(request: Request, { params }:  { params: Promise<{ slug: string }> }): Promise<NextResponse> {
    const { slug } = await params;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find the session by its slug
    const session = MOCK_SESSION_DATA.find(s => s.slug === slug);

    if (!session) {
        return NextResponse.json({ message: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json(session);
}
