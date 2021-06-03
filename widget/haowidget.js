// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: syringe;
/*
  วิทเจ็ท (วิจิท) แสดงตารางสอน
  
  วิทเจ็ทนี้สามารถระบุคาบเรียน วิชาที่เรียน ณ ปัจจุบัน วิชาต่อไปของคาบเรียน และอื่นๆ ช่วยให้ผู้ใช้ไม่ต้องเปิดดูตารางสอนหรือตั้งเป็นพื้นหลังของหน้าจอ
  
  ผู้เขียน : สิทธิภัทท์ เทพสุธา
  
  กฎและเงื่อนไขในการใช้งาน
    - ห้ามคัดลอกหรือดัดแปลงโค๊ดเป็นของตนเอง
    - ห้ามใช้วิทเจ็ทนี้ในการหารายได้หรือผลประโยชน์ของตัวเองหรือกลุ่มบางกลุ่ม
  
  
  วิธีใช้งาน
    การเรียกใช้งาน
    - แสดงผลผ่านทางวิทเจ็ท โดยมีวิธีดังนี้
      1. เพิ่มวิทเจ็ดใหม่
      2. เรียกใช้วิทเจ็ทผ่านทางแอพ scriptable
      3. เลือก script นี้
    - ระบบนี้สามารถแสดงผลที่แตกต่างกันในแต่ละขนาดของวิทเจ็ท (ขนาดเล็กและใหญ่)
    
    การตั้งค่าวิทเจ็ท
    - สามารถกำหนดวันเองได้โดยวิธีดังนี้
      1. กดหรือแตะค้างที่หน้าวิทเจ็ท
      2. กดไปที่แก้ไข "scriptable"
      3. ไปที่ parameter
      4. ใส่คำว่า setDay <number>
        <number> ให้ใส่ตัวเลขจำนวนเต็มระหว่าง 0 ถึง 6 โดยเลข 0 คือวันอาทิตย์ 1 คือวันจันทร์ 2 คือวันอังคาร ... 6 คือวันเสาร์
      5. ออกและเสร็จสิ้น
*/


// code >>

var widgetFamily = config.widgetFamily;

class Config {
    constructor(startTime, width, nullMessage, className) {
        this.startTime = startTime;
        this.width = width;
        this.nullMessage = nullMessage;
        this.className = className;
    }
    getStartTime = () => this.startTime;
    getClassWidth = () => this.width;
    getNullMessage = () => this.nullMessage;
    getClassName = () => this.className;
}

var subjectData = {
    Data: []
}

var conf = new Config(500, 50, "❌ไม่มี", "ม.6/10");
var nullMessage = conf.getNullMessage();

//special function ; return local object.
function getSubjectDay(day) {
    return new SubjectDay(day);
}

class SubjectDay {
    constructor(day) {
        this.day = day;
    }
    getSubject(ch) {
        try {
            if (1440 <= getMinuteFromClassHour(ch + 1)) {
                return "❌ch overflow";
            }
            if (subjectData.Data[this.day][ch] == null) {
                return nullMessage;
            }
            return subjectData.Data[this.day][ch];
        } catch (TypeError) {
            return nullMessage;
        }

    }
    getSubjectLength() {
        return subjectData.Data[this.day].length;
    }
    setSubject(subject) {
        subjectData.Data[this.day] = subject;
        return true;
    }
}


getSubjectDay(1).setSubject(["➗คณิตหลัก", "🇹🇭ไทย", "🇬🇧อังกฤษหลัก", "💵เศรญฐศาสตร์", "🍗พักกลางวัน", "🇬🇧อังกฤษเสริม", "🏃🏽พละ", "🌏โลก ดาราศาสตร์และอวกาศ", "🌏โลก ดาราศาสตร์และอวกาศ"]);
getSubjectDay(2).setSubject(["🇬🇧อังกฤษเสริม", "➗คณิตเสริม", "✡️สังคม", "🏃🏽สุขะศึกษา", "🍗พักกลางวัน", "➗คณิตหลัก", "🎨ศิลปะ", "⚙️ฟิสิกส์", "⚙️ฟิสิกส์", "❌ไม่มี", "🍫กินขนม"]);
getSubjectDay(3).setSubject(["🧪เคมี", "📂เรียนรู้ด้วยตัวเอง (IS)", "➗คณิตหลัก", "🇬🇧อังกฤษต่างชาติ", "🍗พักกลางวัน", "⚙️ฟิสิกส์", "⚙️ฟิสิกส์", "🙏ชมรม"]);
getSubjectDay(4).setSubject(["🏹พบที่ปรึกษา", "➗คณิตเสริม", "🏨การโรงแรม", "💵เศรษฐศาสตร์", "🍗พักกลางวัน", "🖥คอมพิวเตอร์", "🌱ชีวะวิทยา", "🌱ชีวะวิทยา", "✡️จริยธรรม"]);
getSubjectDay(5).setSubject(["🧪เคมี", "🧪เคมี", "📌แนะแนว", "🌱ชีวะวิทยา", "🍗พักกลางวัน", "🇹🇭ไทย", "🇬🇧อังกฤษหลัก", "➗คณิตเสริม", "📂เรียนรู้ด้วยตัวเอง (IS)"]);
getSubjectDay(0).setSubject((function () {
    let out = [];
    for (let i = 0; i <= 19; i++) {
        let rd = getRndInteger(1, 5);
        let sd = getSubjectDay(rd);
        out[out.length] = sd.getSubject(getRndInteger(0, sd.getSubjectLength() - 1));
    }
    return out;
})());

// local date day
const currentDate = new Date();
var currentDay = currentDate.getDay();

// widget parameter >>
if (args.widgetParameter != null) {
    let cmd = args.widgetParameter.toString().split(" ");
    if (cmd.length == 2 && cmd[0] == "setDay") {
        let setDay = parseInt(cmd[1]);
        if (!Number.isNaN(setDay)) {
            currentDay = setDay;
        }
    }
}
// end widget parameter //

// Main
if (config.runsInWidget) {
    if (!(args.shortcutParameter)) {
//         let loadwid = await creatLoadWidget();
//         Script.setWidget(loadwid);
//         Script.complete();
        let wid = await rw(false);
        Script.setWidget(wid);
        Script.complete();
    }

} else if (args.shortcutParameter) {
    let input = args.shortcutParameter.split(" ");
    let next = 0;
    if (!(Number.isNaN(parseInt(input[1])))) {
        next = parseInt(input[1]);
    }
    if (input[0].toLowerCase().trim() == "getSubject".toLowerCase().trim()) {
        Script.setShortcutOutput(getSubject(currentDay, getClassHour(getTimeMinute(currentDate)), next));
        Script.complete();
    } else {
        Script.setShortcutOutput("Error : มีบางอย่างผิดพลาด");
        Script.complete();
    }
}


// [--function declare--]

async function creatLoadWidget(){
  let widget = new ListWidget();
  let title = widget.addText("Loading...");
  let t1 = widget.addText("Plese wait");
  t1.font = new Font("default", 10);
  
  return new Promise((f,r)=>{
    f(widget);
  })
}



/**
 * สร้าง widget และค่าในแต่ละ layout
 * @author Sittipat Tepsutar
 * @returns {Promise<ListWidget>} Promise > ListWidget
 */
async function createWidget() {

    let hwid = new ListWidget();

    // default color
    hwid.backgroundColor = new Color("#00DD55", 0.6);
    let bgg = new LinearGradient();
    switch (getRndInteger(0, 3)) {
        case 0:
            bgg.colors = [new Color("#00DD55", 1), new Color("#009999", 1)];
            break;
        case 1:
            bgg.colors = [new Color("#FFACBA", 1), new Color("#ABCDFF", 1)];
            break;
        case 2:
            bgg.colors = [new Color("#AFDEA6", 1), new Color("#AE6033", 1)];
            break;
        case 3:
            bgg.colors = [new Color("#8999A9", 1), new Color("#596979", 1)];
            break;
        default:
    }

    bgg.locations = [0, 1];
    hwid.backgroundGradient = bgg;

    /*.  ---[Widget Size Formula]---
    Small = 120 + padding, 120+ padding
    Medium = 240 + padding * 3, 120 + padding
    Large = 240 + padding * 3, 240 + padding * 3
         --------------------------- */

    const padding = ((Device.screenSize().width - 240) / 5);
    let widgetSmallSize;
    let widgetLargeSize;
    if (Device.model() == "iPhone") {
        widgetSmallSize = 118 + padding;
        widgetLargeSize = 240 + padding;
    } else {
        widgetSmallSize = 30 + padding;
        widgetLargeSize = 170 + padding;
    }

    // inner background color
    let innerBackgroundColor = Color.dynamic(new Color("#FFFFFF", 0.2), new Color("#000000", 0.2))


    // background image
    try{
      let imggg = await getRandomBackgroundImage();
    if (imggg != null){
      hwid.backgroundImage = imggg;
      hwid.backgroundGradient = null;
    }
    }catch(e){
      hwid.backgroundImage = null;
    }
    

    switch (widgetFamily) {
        /*--------------------------
        // Small/.       Widget >>>
        ----------------------------*/

        case "small": {

            // โครงสร้าง layout
            // hwid layout  
            let head = hwid.addStack();
            let l0 = hwid.addStack();   //เส้นแบ่ง
            let title = hwid.addStack();
            let l1 = hwid.addStack();   //เส้นแบ่ง
            let time = hwid.addStack();
            let l2 = hwid.addStack();   //เส้นแบ่ง
            let body = hwid.addStack();
            let l3 = hwid.addStack();   //เส้นแบ่ง
            let end = hwid.addStack();

            // hwid layout size  
            head.size = new Size(widgetSmallSize, widgetSmallSize * 1 / 9);
            end.size = new Size(widgetSmallSize, widgetSmallSize * 1 / 9);
            time.size = new Size(widgetSmallSize, widgetSmallSize * 1 / 9);
            title.size = new Size(widgetSmallSize, widgetSmallSize * 3.5 / 9);
            body.size = new Size(widgetSmallSize, widgetSmallSize * 2.5 / 9);

            let lsize = new Size(widgetSmallSize, 0.5);
            l0.size = lsize;
            l1.size = lsize;
            l2.size = lsize;
            l3.size = lsize;

            // hwid layout design  
            let lcolor = new Color("#FFFFFF", 0.5);
            l0.backgroundColor = lcolor;
            l1.backgroundColor = lcolor;
            l2.backgroundColor = lcolor;
            l3.backgroundColor = lcolor;

            title.backgroundColor = innerBackgroundColor;

            body.backgroundColor = innerBackgroundColor;

            // time layout
            time.layoutHorizontally();

            let time0 = time.addStack();
            let time1 = time.addStack();

            // time0 time1 size
            time0.size = new Size(time.size.width / 2, time.size.height);
            time1.size = new Size(time.size.width / 2, time.size.height);

            // body layout  
            body.layoutHorizontally();

            let body0 = body.addStack();
            let body1 = body.addStack();

            // body0 body1 size
            body0.size = new Size(body.size.width / 2, body.size.height);
            body1.size = body0.size;

            // value set  

            // title
            {
                title.layoutVertically();
                let tc = title.addText("คาบที่ " + (getClassHour(getTimeMinute(currentDate)) + 1));
                tc.font = new Font("default", 9);
                let t0 = title.addText("กำลังเรียนวิชา 📖");
                t0.font = new Font("default", 12);
                let t1 = title.addText(getSubject(currentDay, getClassHour(getTimeMinute(currentDate)), null));
                t1.textColor = new Color("#0004FF", 1);
                t1.font = new Font("default", 17);
                t1.lineLimit = 1;

            }

            // time0
            {
                time0.layoutHorizontally();
                time0.centerAlignContent();
                let t0 = time0.addText(currentDate.toLocaleDateString());
                t0.font = new Font("defalut", 10);
                t0.lineLimit = 1;
            }

            // time1
            {
                time1.layoutHorizontally();
                time1.centerAlignContent();
                let t0 = time1.addText(getLocalTimeStringFromClassHour(getClassHour(getTimeMinute(currentDate))));
                t0.font = new Font("defalut", 10);
                t0.lineLimit = 1;
            }

            // body0
            {
                body0.layoutVertically();
                let t0 = body0.addText("คาบต่อไป");
                let t1 = body0.addText("คาบต่อต่อไป");
                t0.font = new Font("default", 10);
                t1.font = t0.font;
            }

            // body1
            {
                body1.layoutVertically();
                for (let i = 0; i <= 1; i++) {
                    let ch = getClassHour(getTimeMinute(currentDate)) + i + 1;
                    let t0;
                    if (getMinuteFromClassHour(ch + 1) >= 1440) {
                        t0 = body1.addText(": ");
                    } else {
                        t0 = body1.addText(": " + getSubject(currentDay, ch, null));
                    }
                    t0.font = new Font("default", 10);
                    t0.lineLimit = 1;
                }
            }

            // head
            {
                head.layoutHorizontally();
                head.addSpacer();
                let t0 = head.addText(getSplashText());
                t0.font = new Font("default", 10);
                t0.textColor = new Color("#FFFF00", 1);
                t0.lineLimit = 1;
                head.addSpacer();
            }

            // end
            {
                end.layoutHorizontally();
                end.addSpacer();
                let t0 = end.addText("⚠️ตามตารางเรียนของ " + conf.getClassName());
                t0.font = new Font("default", 8);
                t0.lineLimit = 1;
                end.addSpacer();
            }



            return new Promise((resolve, reject) => {
                resolve(hwid)
            });
            break;
        }
        case "medium": {

            /*-------------------
               Medium widget >>>
            ---------------------*/

            let t1 = hwid.addText("Not available " + new Date().getSeconds());

            return new Promise((resolve, reject) => {
                resolve(hwid);
            });
            break;
        }

        case "large":

            /*-------------------
               Large widget >>>
            ---------------------*/

            //line
            let lc = new Color("#FFFFFF", 0.5);


            //Title , Chart
            let title = hwid.addStack();
            title.size = new Size(widgetLargeSize * 1.1, widgetLargeSize * 1.4 / 3);

            let lw0 = hwid.addStack();
            lw0.size = new Size(title.size.width, 0.5);
            lw0.backgroundColor = lc;
            let chart = hwid.addStack();

            chart.size = new Size(widgetLargeSize * 1.1, widgetLargeSize * 2 / 3);
            chart.layoutVertically();

            title.backgroundColor = innerBackgroundColor;
            title.cornerRadius = 10;


            //Title 1,2
            let title1 = title.addStack();
            let lt12 = title.addStack();
            let title2 = title.addStack();
            title1.size = new Size(title.size.width / 2, title.size.height);
            title2.size = title1.size;
            title2.layoutVertically();

            lt12.size = new Size(0.5, title.size.height);
            lt12.backgroundColor = lc;


            //Info , Time left
            let info = title2.addStack();
            info.size = new Size(title2.size.width, title2.size.height * 2.4 / 3);
            let time = title2.addStack();
            time.size = new Size(title2.size.width, title2.size.height * 0.6 / 3);


            //Chart layout head,body
            let head = chart.addStack();
            head.size = new Size(chart.size.width, chart.size.height / 6);
            head.layoutHorizontally();

            let headline = chart.addStack();
            headline.size = new Size(chart.size.width, 0.5);
            headline.backgroundColor = lc;

            let body = chart.addStack();

            body.size = new Size(chart.size.width, chart.size.height * 5 / 6);
            body.layoutHorizontally();

            body.backgroundColor = innerBackgroundColor;
            body.cornerRadius = 10;


            //title1 layout  
            let title10 = title1.addStack();
            let t1l0 = title1.addStack();
            let title11 = title1.addStack();

            title1.layoutVertically();


            //title1 layout size,design
            title10.size = new Size(title1.size.width, title1.size.height * 1.9 / 3);
            title11.size = new Size(title1.size.width, title1.size.height * 1.1 / 3);

            title11.layoutHorizontally();
            title10.layoutVertically();

            title10.setPadding(0, 5, 0, 0);


            //title11 layout
            let title110 = title11.addStack();
            let title111 = title11.addStack();


            //title11 layout size,design
            title110.size = new Size(title11.size.width * 0.9 / 2, title11.size.height)
            title111.size = new Size(title11.size.width * 1.1 / 2, title11.size.height)

            title110.layoutVertically();
            title111.layoutVertically();

            title110.setPadding(0, 5, 5, 0);
            title111.setPadding(0, 5, 5, 1);


            //head layout
            let h0 = head.addStack();

            lh01 = head.addStack();

            let h1 = head.addStack();
            let h2 = head.addStack();

            h0.size = new Size(head.size.width * 0.2, head.size.height);

            h1.size = new Size(head.size.width * 0.4, head.size.height);

            h2.size = new Size(head.size.width * 0.4, head.size.height);

            lh01.size = new Size(0.5, head.size.height);
            lh01.borderWidth = 0.5;
            lh01.borderColor = lc;


            //body layout
            let b0 = body.addStack();
            let b1 = body.addStack();
            let b2 = body.addStack();

            b0.size = new Size(body.size.width * 0.2, body.size.height);

            b1.size = new Size(body.size.width * 0.5, body.size.height);

            b2.size = new Size(body.size.width * 0.3, body.size.height);
            b0.layoutVertically();
            b1.layoutVertically();
            b2.layoutVertically();


            //info layout
            info.layoutVertically();
            let cname = info.addStack();
            cname.size = new Size(info.size.width, info.size.height * 7.5 / 25);

            let hello = info.addStack();
            hello.size = new Size(info.size.width, info.size.height * 7.5 / 25)
            hello.centerAlignContent();

            let day = info.addStack();
            day.size = new Size(info.size.width, info.size.height * 10 / 25);
            day.centerAlignContent();


            //present font,color
            let pf = new Font("Arial", 12);
            let pc = new Color("#FFFF00", 1);

            //font
            let f = new Font("Arial", 12)


            //b0 layout , value set
            for (let i = 0; i <= 3; i++) {
                let ci = i;
                if (getClassHour(getTimeMinute(currentDate)) == -1) {
                    ci++;
                }
                let ch = getClassHour(getTimeMinute(currentDate)) + ci;
                let b0i = b0.addStack();
                b0i.centerAlignContent();
                b0i.size = new Size(b0.size.width, b0.size.height / 4);
                let t;
                if (getMinuteFromClassHour(ch) >= 1440) {
                    t = b0i.addText("");
                } else {
                    t = b0i.addText(ch.toString());
                }
                if (isPresentClassHour(ch)) {
                    t.font = pf;
                    t.textColor = pc;
                } else {
                    t.font = f;
                }

            }


            //b1 layout , value set
            for (let i = 0; i <= 3; i++) {
                let ci = i;
                if (getClassHour(getTimeMinute(currentDate)) == -1) {
                    ci++;
                }
                let ch = getClassHour(getTimeMinute(currentDate)) + ci;
                let bi = b1.addStack();
                bi.centerAlignContent();
                bi.size = new Size(b1.size.width, b1.size.height / 4);
                let t;
                if (getMinuteFromClassHour(ch) >= 1440) {
                    t = bi.addText("");
                } else {
                    t = bi.addText(getSubject(currentDay, ch - 1, null));
                }

                if (isPresentClassHour(ch)) {
                    t.font = pf;
                    t.textColor = pc;
                } else {
                    t.font = f;
                }
                t.lineLimit = 1;
                bi.addSpacer();
            }


            //b2 layout , value set
            for (let i = 0; i <= 3; i++) {
                let ci = i;
                if (getClassHour(getTimeMinute(currentDate)) == -1) {
                    ci++;
                }
                let ch = getClassHour(getTimeMinute(currentDate)) + ci;
                let bi = b2.addStack();
                bi.centerAlignContent();
                bi.size = new Size(b2.size.width, b2.size.height / 4);
                let t;
                if (getMinuteFromClassHour(ch) >= 1440) {
                    t = bi.addText("");
                } else {
                    t = bi.addText(getLocalTimeStringFromClassHour(ch - 1));
                }

                bi.addSpacer();
                if (isPresentClassHour(getClassHour(getTimeMinute(currentDate)) + ci)) {
                    t.font = pf;
                    t.textColor = pc;
                } else {
                    t.font = f;
                }
                t.lineLimit = 1;
            }


            //head value set : h0-2
            h0.centerAlignContent();
            h1.centerAlignContent();
            h2.centerAlignContent();

            h0.addText("คาบ").font = f;
            h1.addSpacer(12);
            h1.addText("วิชา").font = f;
            h2.addText("เวลา").font = f;

            h1.addSpacer();

            //title1... value set
            ct = title10.addText("คาบที่ " + (getClassHour(getTimeMinute(currentDate)) + 1).toString());
            ct.font = new Font("Arial", 10);
            ct.lineLimit = 1;

            let t1T0 = title10.addText("กำลังเรียนวิชา 📖");
            t1T0.font = new Font("default", 16);
            t1T0.textColor = new Color("#FFFFAA", 1)

            s = title10.addText(getSubject(currentDay, getClassHour(getTimeMinute(currentDate)), null));
            s.font = new Font("default", 22);
            s.textColor = new Color("#3333FF", 1);
            s.lineLimit = 1;

            t1l0.size = new Size(title10.size.width, 0.5);
            t1l0.backgroundColor = lc;

            {
                let ct1 = title110.addText("คาบต่อไป");
                ct1.font = new Font("default", 10);
                ct1.lineLimit = 1;

                let ct2 = title110.addText("คาบต่อต่อไป");
                ct2.font = new Font("default", 10);
                ct2.lineLimit = 1;
            }

            {
                for (let i = 0; i <= 1; i++) {
                    let ch = getClassHour(getTimeMinute(currentDate)) + 1 + i;
                    let ct1;
                    if (getMinuteFromClassHour(ch + 1) >= 1440) {
                        ct1 = title111.addText(": ");
                    } else {
                        ct1 = title111.addText(": " + getSubject(currentDay, ch, null));
                    }
                    ct1.font = new Font("default", 10);
                    ct1.lineLimit = 1;
                }
            }



            //info value set
            cname.centerAlignContent();
            let cnameT = cname.addText("⚠️ตามตารางเรียนของ " + conf.getClassName());
            cnameT.font = new Font("default", 10);
            cnameT.centerAlignText();


            //hello value
            hello.layoutHorizontally();
            hello.bottomAlignContent();
            let helloT = hello.addText(getWelcome(getTimeMinute(currentDate))); {
                let font = Font.boldSystemFont(16);
                helloT.font = font;
            }


            // day value
            let dayT = day.addDate(currentDate); {
                let font = Font.boldSystemFont(16);
                dayT.font = font;
                dayT.centerAlignText();
                day.layoutHorizontally();
                day.topAlignContent();
            }

            let timeT = time.addText(getSplashText());
            timeT.font = new Font("Arial", 14);
            time.centerAlignContent();
            timeT.textColor = new Color("FFFF00", 1);


            //complete
            return new Promise((resolve, reject) => {
                resolve(hwid);
            });
    }
    return new Promise((resolve, reject) => {
      resolve(hwid);
    })
}

/**
 * setWidget
 * @param {boolean} notify 
 */
async function rw(notify) {
    let widget = await createWidget();
    //     widget.presentMedium();
    
    
    if (notify) {
        let n = new Notification();
        n.title = "Debug";
        n.body = `${Script.name()} is refresh ; ${config.widgetFamily};Time = ${getLocalTimeStringFromClassHour(getClassHour(getTimeMinute(currentDate)))} [${getClassHour(getTimeMinute(currentDate))}]`;
        n.sound = "event";
        n.addAction("Debug 1", "scriptable:///open/" + encodeURI(Script.name()));

        n.schedule();
    }
    return new Promise((f,r)=>{
      f(widget);
    })
}

/**
 * ฟังก์ชันนี้จะรับวัตถุวันมาแล้วจะส่งออกข้อมูลในรูปแบบตัวเลขในหน่วยนาทีตั้งแต่จุดเริ่มต้นของวัน
 * @param {Date} date วัตถุวันที่อยู่ในแม่พิมพ์ Date
 * @returns นาทีตั้งแต่จุดเริ่มต้นของวัน
 */
function getTimeMinute(date) {
    return (date instanceof Date) ? date.getHours() * 60 + date.getMinutes() : null;
}

/**
 * ฟังก์ชันนี้จะส่งออกชื่อวิชาในรูปแบบข้อความ
 * @param {Date} date
 * @param {number} classhour 
 * @param {number} next 
 * @returns ชื่อวิชา
 * @author Sittipat Tepsutar
 */
function getSubject(day, classhour, next) {
    if (next === null || next === undefined) {
        next = 0;
    }
    classhour = classhour + next;
    return getSubjectDay(day).getSubject(classhour);
}

/**
 * นำเวลาในรูปแบบนาทีมาคำนวนคาบแล้วส่งออก
 * @param {number} Timeminute 
 * @returns คาบในเวลานั้นๆ
 * @author Sittipat Tepsutar
 */
function getClassHour(Timeminute) {
    let classhour = ((Timeminute - conf.getStartTime()) / conf.getClassWidth());
    if (classhour >= 1) {
        return Math.floor(classhour);
    }
    return -1;
}

/**
 * ส่งกลับวันจากนาที
 * @param {number} minute 
 * @returns วัน
 * @author Sittipat Tepsutar
 */
function getTimeFromMinute(minute) {
    let returndate = new Date();
    returndate.setHours(Math.floor(minute / 60));
    returndate.setMinutes(minute % 60);
    returndate.setSeconds(0);
    returndate.setMilliseconds(0);
    return returndate;
}

/**
 * คำนวนหานาทีจากคาบ
 * @param {number} ch 
 * @returns นาที
 * @author Sittipat Tepsutar
 */
function getMinuteFromClassHour(ch) {
    return (ch * conf.getClassWidth()) + conf.getStartTime();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function notific(title, text) {
    let n = new Notification();
    n.title = title;
    n.body = text;
    return n.schedule();
}

/**
 * คำนวนเวลา(ในรูปแบบข้อความ string)ในคาบ
 * @param {number} ch
 * @returns เวลาที่อยู่ในคาบที่รับมา
 * @author Sittipat Tepsutar
 * @see getTimeFromMinute
 * @see getClassHour
 */
function getLocalTimeStringFromClassHour(ch) {
    if (getMinuteFromClassHour(ch + 1) >= 1440) {
        return "";
    }
    let pad = (d) => (d < 10) ? '0' + d.toString() : d.toString();
    let t1 = getTimeFromMinute(getMinuteFromClassHour(ch));
    let t2 = getTimeFromMinute(getMinuteFromClassHour(ch + 1));
    return `${pad(t1.getHours())}:${pad(t1.getMinutes())}-${pad(t2.getHours())}:${pad(t2.getMinutes())}`;
}

function isPresentClassHour(ch) {
    return (getClassHour(getTimeMinute(currentDate)) + 1 == ch) ? true : false;
}


// January 14, 2012Mike Bostock
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
}

function getWelcome(timeminute) {
    if (timeminute >= 1140) {
        return "สวัสดีตอนกลางคืน";
    } else if (timeminute >= 960) {
        return "สวัสดีตอนเย็น";
    } else if (timeminute >= 780) {
        return "สวัสดีตอนบ่าย";
    } else if (timeminute >= 690) {
        return "สวัสดีตอนกลางวัน";
    } else if (timeminute >= 540) {
        return "สวัสดีตอนสาย";
    } else if (timeminute >= 300) {
        return "สวัสดีตอนเช้า";
    } else {
        return "สวัสดีตอนกลางคืน";
    }
}

async function getRandomBackgroundImage(forceUrl) {

        let urlList;

        if (Device.isUsingDarkAppearance()) {
            //Dark mode background image.
            urlList = [
                "https://variety.com/wp-content/uploads/2016/04/watership-down.jpg",
                "https://i.pinimg.com/originals/3b/8a/d2/3b8ad2c7b1be2caf24321c852103598a.jpg",
                "https://images2.alphacoders.com/110/1109233.jpg",
                "https://images.alphacoders.com/110/1109227.jpg",
                "https://images5.alphacoders.com/112/1123013.jpg",
                "https://images.wallpaperscraft.com/image/matrix_code_numbers_147523_3840x2160.jpg",
                "https://images.wallpapersden.com/image/download/binary-5k-colorful_bGVubW2UmZqaraWkpJRnamtlrWZpaWU.jpg",
                "https://www.history.com/.image/t_share/MTY4OTUzMDI2NjI5ODcxNDI3/illuminati-gettyimages-188003212.jpg",
                "https://image.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg",
                "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4V4Ji09chhs5ujcqdWcPnbGDQcswnl3UDdVYVBgEbro7ADad6pl.jpg"
            ]
        } else {
            //White mode background image.
            urlList = [
                "http://s-tlk.org/misc/watership_down-05.2014/watership_down_distance.png",
                "https://static01.nyt.com/images/2018/12/21/arts/21watership/21watership-superJumbo-v3.jpg",
                "https://cdn.shortpixel.ai/spai/w_1400+q_lossy+ret_img/https://www.donottellmyboss.com/wp-content/uploads/2013/08/green-white-background.jpg",
                "https://media.architecturaldigest.com/photos/58e2a407c0e88d1a6a20066b/2:1/w_1287,h_643,c_limit/Pyramid%20of%20Giza%201.jpg",
            ]
        }

        //Shuffle urlList
        shuffle(urlList);

        //store Image
        let img;
        let errorInfo = "";
        for(let e of urlList){
          
          try{
            let req = new Request(e);
            img = await req.loadImage();
            break;
          }catch(error){
            errorInfo += `Skip ${e} : ${error.message}\n`;
          }
        }
        if (errorInfo != ""){
          notific("Error info", errorInfo);
        }
        return new Promise((resolve,reject) => {
          if (img != null) {
            resolve(img)
        } else {
            reject(null);
        }
        })
    
}

function getSplashText() {
    let splashTextArr = [
        "สวัสดีชาวโลก!!!",
        "สมการเชิงเส้น!!!",
        "อย่าลืมล้างมือ!!",
        "ว้าว สีรุ้ง!!!",
        "กินน้ำ ดื่มข้าว!!!",
        "เว้นระยะห่าง!",
        "ใส่แม๊สด้วย!!",
        "Stay home!!!",
        "Wash your hand!!!",
        "เตางอยยย!!!",
        "LOLOLOLOLLOLL",
        "Creeper, Aw mannn...",
        "Illuminati confirmed!!!",
        "เฮเซลนัด อร่อย!!",
        "Also try minecraft!!!",
        "Bright eye!!!",
        "Made by Sittipat!!!",
        "Noelle!!!",
        "Sorting algorithm!!!",
        "SplashText!!!",
        "Hello World!!!",
        getRndInteger(10, 50).toString() + " + " + getRndInteger(10, 50).toString() + " = ?",
        getRndInteger(10, 50).toString() + " - " + getRndInteger(10, 50).toString() + " = ?",
        getRndInteger(2, 12).toString() + " × " + getRndInteger(2, 12).toString() + " = ?",
        (function () {
            let x = getRndInteger(2, 12);
            let y = getRndInteger(2, 12) * x;
            return y.toString() + " ÷ " + x.toString() + " = ?";
        })(),
        Device.name() + "!!!",
        Math.round(Device.batteryLevel() * 100).toString() + "% !!!"
    ];
    return splashTextArr[getRndInteger(0, splashTextArr.length - 1)];
}

// end function declare