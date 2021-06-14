// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: magic;
/*
  วิทเจ็ท (วิจิท) แสดงตารางสอน
  
  วิทเจ็ทนี้สามารถระบุคาบเรียน วิชาที่เรียน ณ ปัจจุบัน วิชาต่อไปของคาบเรียน และอื่นๆ ช่วยให้ผู้ใช้ไม่ต้องเปิดดูตารางสอนหรือตั้งเป็นพื้นหลังของหน้าจอ
  เมื่อใช้งานแล้ว ถ้าว่างๆก็เข้ามาทำแบบสอบถามความพึงพอใจได้ที่
    - https://forms.gle/As3pfDxbfUTYnfxP8
  
  ผู้เขียน : สิทธิภัทท์ เทพสุธา
  
  กฎและเงื่อนไขในการใช้งาน
    - สามารถใช้งานได้ฟรี
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
Notification.removeAllPending();
// load file.
let fm = FileManager.local();
let path = null;
let raw_json = null;
if (fm.bookmarkExists("HaoWidget")) {
    path = fm.bookmarkedPath("HaoWidget") + "/subject_data.json";
}
else {
    let message = "กรุณาเพิ่ม Bookmark ในแอพ Scriptable ที่ชื่อ HaoWidget\n(เพื่อเป็นการบันทึกข้อมูลวิชาที่จะใช้ในกรณีที่ไม่มีการเชื่อมต่อกับอินเทอร์เน็ต.)";
    console.warn(message);
    let n = new Notification();
    n.title = "คำเตือน";
    n.body = message;
    n.addAction("Open app", "scriptable:///", false);
    n.addAction("Open Script", `scriptable:///open/${Script.name()}`, false);
    await n.schedule();
}
if (config.runsInWidget || args.shortcutParameter) {
    let request = new Request("https://raw.githubusercontent.com/karnhao/HaoWidget/main/subject_data/6-10/6-10.json");
    try {
        raw_json = await request.loadJSON();
        if (path) {
            fm.writeString(path, JSON.stringify(raw_json));
        }
    }
    catch (e) {
        console.log(e.message);
        try {
            if (path && fm.fileExists(path)) {
                raw_json = JSON.parse(fm.readString(path));
            }
            else {
                throw new Error();
            }
        }
        catch (e) {
            throw new Error("การโหลดไฟล์ล้มเหลวและไม่พบไฟล์ข้อมูลเก่า. คำแนะนำ : ทำให้แน่ใจว่าอุปกรณ์เชื่อมต่อกับอินเทอร์เน็ตอยู่ และ refresh widget ใหม่.");
        }
    }
}
class Subject {
    width = 0;
    startTime = 0;
    period = -1;
    name = "";
    id = "";
    roomId = "";
    teacher = [];
    constructor(name) {
        if (name) {
            this.name = name;
        }
    }
    /**
     *
     * @param {String} id รหัสวิชา.
     */
    setId(id) {
        this.id = id;
    }
    /**
     *
     * @param {String} name ชื่อวิชา.
     */
    setName(name) {
        if (typeof name == "string") {
            this.name = name;
            return;
        }
        throw new TypeError("Parameter ต้องเป็น string.");
    }
    /**
     *
     * @param  {String[]} teacher รายชื่อครูประจำวิชา (array).
     */
    setTeacher(teacher) {
        this.teacher = teacher;
    }
    /**
     *
     * @param {String} roomId ชื่อห้องเรียนหรือรหัสห้องเรียน.
     */
    setRoomId(roomId) {
        this.roomId = roomId;
    }
    /**
     *
     * @param {Number} number ระยะเวลาเรียน หน่วยเป็นนาที.
     */
    setWidth(number) {
        if (typeof number == "number" || number == null) {
            this.width = number;
        }
        else {
            throw new TypeError(`Parameter ต้องเป็นตัวเลขเท่านั้น. : ${number}`);
        }
    }
    /**
     * @param {Number} number หมายเลขคาบในวิชา.
     */
    setPeriod(number) {
        if (typeof number == "number" || !number) {
            if (!Number.isInteger(number) && number)
                throw new TypeError(`Parameter ต้องเป็นตัวเลขที่เป็นจำนวนเต็มเท่านั้น. : ${number}`);
            else
                this.period = number;
        }
        else {
            throw new TypeError(`Parameter ต้องเป็นตัวเลขเท่านั้น. : ${number}`);
        }
    }
    /**
     * @param {Number} time เวลาในหน่วยนาที นับตั้งแต่ 0:00น.
     */
    setStartTime(time) {
        this.startTime = time;
    }
    /**
     *
     * @returns {String} รหัสวิชา
     */
    getId() {
        return this.id;
    }
    getLocaleId() {
        return this.getId().replaceAll("", " ").trim();
    }
    /**
     *
     * @returns {String} รหัสวิชาในรูปแบบที่ให้ ai อ่าน.
     */
    getLocaleSpeakId() {
        return this.getId() ? ((inp) => {
            let out = "";
            inp.forEach((t) => {
                out += isNaN(Number(t)) ? `${t}_,` : `${t}`;
            });
            return out.replaceAll("", " ").trim();
        })(this.getId().replaceAll("", " ").trim().split(" ")) : "ไม่มีข้อมูล";
    }
    /**
     *
     * @returns {String} ชื่อวิชา
     */
    getName() {
        return this.name;
    }
    /**
     *
     * @returns รายชื่อครูประจำวิชา (array).
     */
    getTeacher() {
        return this.teacher;
    }
    /**
     *
     * @returns รายชื่อครูประจำวิชาในภาษามนุษย์ทั่วไป
     */
    getLocaleTeacherName() {
        if (!this.getTeacher()) {
            return "ไม่มีข้อมูล";
        }
        let t_arr = this.teacher;
        let out = "";
        for (let i = 0; i < t_arr.length; i++) {
            out += (i == t_arr.length - 1) ? `${t_arr[i]}` : `${t_arr[i]} และ `;
        }
        return out;
    }
    /**
     *
     * @returns ชื่อห้องเรียนหรือรหัสห้องเรียน.
     */
    getRoomId() {
        return this.roomId;
    }
    /**
     *
     * @returns {String}
     */
    getLocaleRoomId() {
        if (!this.getRoomId()) {
            return "ไม่มีข้อมูล";
        }
        let ins = this.getRoomId();
        let out = ins[0];
        for (let i = 1; i < ins.length; i++) {
            out += isNaN(Number(ins[i])) || ins[i].match("\\s+") || ins[i - 1].match("\\s+") ? ins[i] : ` ${ins[i]}`;
        }
        return out;
    }
    /**
     *
     * @returns ระยะเวลาเรียน หน่วยเป็นนาที.
     */
    getWidth() {
        return this.width;
    }
    /**
     *
     * @returns หมายเลขคาบในวิชา.
     */
    getPeriod() {
        return this.period;
    }
    getLocalePeriod() {
        let out = this.getPeriod();
        if (typeof (out) === 'number') {
            out++;
            return out.toString();
        }
        return "NULL";
    }
    /**
     *
     * @returns เวลาเมื่อเริ่มต้นคาบเรียนในรูปแบบนาทีที่นับตั้งแต่ 0:00น.
     */
    getStartTime() {
        return this.startTime;
    }
    getLocaleStartTime() {
        return getLocalTimeStringFromMinute(this.getStartTime());
    }
    /**
     *
     * @returns {Number} เวลาเมื่อจบคาบเรียนในรูปแบบนาทีที่นับตั้งแต่ 0:00น.
     */
    getEndTime() {
        return this.startTime + this.width;
    }
    getLocaleEndTime() {
        return getLocalTimeStringFromMinute(this.getEndTime());
    }
    getLocaleTime() {
        return `${this.getLocaleStartTime()}-${this.getLocaleEndTime()}`;
    }
    /**
     * ส่งกลับข้อความที่เป็นภาษามนุษย์
     * @returns {String} ข้อความที่มนุษย์อ่านได้
     */
    getLocaleString() {
        return ` คาบที่ ${this.getLocalePeriod()} ของวัน.\n เรียนวิชา : ${this.getName()}.\n รหัส : ${this.getLocaleId()}\n`
            + ` เรียนที่ : ${this.getLocaleRoomId()}\n`
            + ` ตั้งแต่เวลา : ${this.getLocaleStartTime()} น. ถึง ${this.getLocaleEndTime()} น.\n เป็นเวลา : ${this.getWidth()} นาที.\n`
            + ` ครูผู้สอนคือ : ${this.getLocaleTeacherName()}.`;
    }
    /**
     * ส่งกลับข้อความสำหรับให้ ai อ่าน.
     * @returns {String} ข้อความที่มนุษย์อ่านได้.
     */
    getLocaleSpeakString() {
        return ` คาบที่ ${this.getLocalePeriod()} ของวัน.\n เรียนวิชา : ${this.getName()}.\n รหัส : ${this.getLocaleSpeakId()}\n`
            + ` เรียนที่ : ${this.getLocaleRoomId()}\n`
            + ` ตั้งแต่เวลา : ${this.getLocaleStartTime()} น. ถึง ${this.getLocaleEndTime()} น.\n เป็นเวลา : ${this.getWidth()} นาที.\n`
            + ` ครูผู้สอนคือ : ${this.getLocaleTeacherName()}.`;
    }
}
class ClassData {
    static data = {
        startTime: 0,
        classId: '',
        className: '',
        nullSubject: new Subject()
    };
    static get(day) {
        if (typeof (day) === 'number') {
            return SubjectDay.get(day);
        }
        return SubjectDay.get();
    }
    /**
     * สามารถโหลดหรือดูตัวอย่างข้อมูลดิบที่จะนำมาใส่ใน parameter ของฟังก์ชันนี้ได้ที่.
     *  - https://raw.githubusercontent.com/karnhao/HaoWidget/main/subject_data/6-10/6-10.json
     * @param {any} json ข้อมูลดิบ.
     */
    static setData(json) {
        this.setStartTime(json.startTime);
        this.setClassId(json.classId);
        this.setClassName(json.className);
        this.setNullSubject((function (data) {
            let s = new Subject();
            let raw_s = data.nullSubject;
            s.setId(raw_s.id);
            s.setName(raw_s.name);
            s.setPeriod(raw_s.period);
            s.setRoomId(raw_s.roomId);
            s.setStartTime(0);
            s.setTeacher(raw_s.teacher);
            s.setWidth(raw_s.width);
            return s;
        })(json));
        // set Data from subjectList.
        // loop day 0 to 6.
        for (let i = 0; i < 7; i++) {
            let f = new Function('data', `return data.subjectList._${i};`);
            let sl = f(json);
            if (Array.isArray(sl)) {
                let s = [];
                let k = 0;
                // loop subject in subjectList.
                for (let j of sl) {
                    let raw_object = j;
                    let si = new Subject();
                    si.setName(raw_object.name);
                    si.setId(raw_object.id);
                    si.setPeriod(k);
                    si.setRoomId(raw_object.roomId);
                    si.setTeacher(raw_object.teacher);
                    si.setWidth(raw_object.width);
                    s.push(si);
                    k++;
                }
                this.get(i).setSubject(s);
            }
        }
        // SubjectDay.update();
    }
    /**
     *
     * @param {Number} number เวลาเริ่มต้นคาบแรก นับตั้งแต่จุดเริ่มต้นของวัน (0:00น) หน่วยเป็นนาที.
     */
    static setStartTime(number) {
        this.data.startTime = number;
    }
    /**
     *
     * @param {any} id id ห้องเรียน.
     */
    static setClassId(id) {
        this.data.classId = id;
    }
    /**
     *
     * @param {String} name ชื่อห้องเรียน.
     */
    static setClassName(name) {
        this.data.className = name;
    }
    /**
     *
     * @param {Subject} subject วิชาว่าง
     */
    static setNullSubject(subject) {
        if (subject instanceof Subject) {
            this.data.nullSubject = subject;
            return;
        }
        throw new TypeError("Parameter ต้องเป็น object ใน Subject.");
    }
    /**
     *
     * @param {Date} date วัน.
     * @returns {Subject} วิชา.
     */
    static getSubjectByDate(date) {
        if (date instanceof Date) {
            return this.get(date.getDay()).getSubjectByTime((date.getHours() * 60) + date.getMinutes());
        }
        throw new TypeError("Parameter ต้องเป็น object ในแม่พิมพ์ Date.");
    }
    static getStartTime() {
        return this.data.startTime;
    }
    static getClassName() {
        return this.data.className;
    }
    static getClassId() {
        return this.data.classId;
    }
    /**
     *
     * @returns {Subject} วิชาว่าง.
     */
    static getNullSubject() {
        return this.data.nullSubject;
    }
}
class SubjectDay {
    constructor(day) {
        if (Number.isInteger(day)) {
            this.day = day;
            return;
        }
        throw new TypeError("Parameter ต้องเป็นจำนวนเต็ม");
    }
    subject = [];
    day;
    static sd = (function () {
        let out = [];
        for (let i = 0; i < 7; i++) {
            out.push(new SubjectDay(i));
        }
        return out;
    })();
    static get(day) {
        if (day != null) {
            return this.sd[Math.floor(day)];
        }
        return this.sd;
    }
    /**
     * อัพเดตเวลาแต่ละคาบของทุกวัน.
     */
    static update() {
        this.sd.forEach((t) => {
            t.update();
        });
    }
    /**
     * อัพเดตเวลาแต่ละคาบของวันนี้.
     * method นี้จะถูกเรียกใช้ตอนมีการเรียกใช้ setSubject
     */
    update() {
        let t = ClassData.getStartTime();
        this.subject.forEach((k) => {
            k.setStartTime(t);
            t += k.getWidth();
        });
    }
    /**
     *
     * @param  {Subject[]} subject
     */
    setSubject(subject) {
        this.subject = subject;
        this.update();
    }
    /**
     *
     * @param {Number} p คาบเรียน index.
     * @returns {Subject} วิชา.
     */
    getSubject(p) {
        // if period < 0
        if (p == -1) {
            let s = ClassData.getNullSubject();
            if (s) {
                s.setStartTime(0);
                s.setWidth(this.subject.length > 0 ? ClassData.getStartTime() : Infinity);
                s.setPeriod(-1);
            }
            return s;
        }
        let out = this.subject[Math.floor(p)];
        if (out != null) {
            // Normal value
            return out;
        }
        else if (p == this.subject.length && p != 0) {
            // End subject.
            let s = ClassData.getNullSubject();
            let last_subject = this.subject[this.subject.length - 1];
            if (s) {
                let last_subject_period = last_subject.getPeriod();
                s.setStartTime((last_subject) ? last_subject.getEndTime() : 0);
                s.setPeriod((last_subject && last_subject_period) ? last_subject_period + 1 : -1);
                s.setWidth(Infinity);
            }
            return s;
        }
        else {
            return null;
        }
    }
    /**
     *
     * @returns {Subject[]} วิชา
     */
    getSubjectList() {
        return this.subject;
    }
    /**
     *
     * @param {Number} timeminute เวลาตั้งแต่จุดเริ่มต้นของวัน (0:00น) หน่วยเป็นนาที.
     * @returns {Subject} วิชา.
     */
    getSubjectByTime(timeminute) {
        return this.getSubject(this.getPeriodByTime(timeminute));
    }
    /**
     *
     * @param {Number} timeminute เวลาตั้งแต่จุดเริ่มต้นของวัน (0:00น) หน่วยเป็นนาที.
     * @returns {Number} คาบ.
     */
    getPeriodByTime(timeminute) {
        // example output : 
        // in < 500 => -1
        // in 500-549 => 0
        // in 550-599 => 1...
        if (timeminute < ClassData.getStartTime() || this.subject.length == 0) {
            return -1;
        }
        let p = 0;
        for (let i of this.getSubjectList()) {
            if (i.getStartTime() <= timeminute && timeminute < i.getEndTime()) {
                return p;
            }
            p++;
        }
        return p;
    }
    /**
     *
     * @returns {String} ข้อมูลวิชาในวันนี้ที่มนุษย์สามารถอ่านได้ง่าย.
     */
    getLocaleSubjectList() {
        if (!this.getSubjectList().length) {
            return "ไม่มีข้อมูล";
        }
        let out = "";
        this.getSubjectList().forEach((t) => {
            out += `${t.getLocaleSpeakString()}\n\n`;
        });
        return out;
    }
    getDay() {
        return this.day;
    }
}
// SET DATA.
if (raw_json) {
    ClassData.setData(raw_json);
}
// global current date day.
const currentDate = new Date();
var currentDay = currentDate.getDay();
// global variable.
var currentMinutes;
var currentSubjectDay = new SubjectDay(0);
var currentPariod = -1;
var currentSubject;
if (config.runsInWidget || args.shortcutParameter) {
    currentMinutes = getTimeMinute(currentDate);
    currentSubjectDay = ClassData.get(currentDay);
    currentPariod = currentSubjectDay.getPeriodByTime(currentMinutes);
    currentSubject = currentSubjectDay.getSubject(currentPariod);
}
// widget parameter >> ----------------------------------------------------->>>.
if (args.widgetParameter != null) {
    let cmd = args.widgetParameter.toString().split(" ");
    if (cmd.length == 2 && cmd[0] == "setDay") {
        let setDay = parseInt(cmd[1]);
        if (!Number.isNaN(setDay)) {
            currentDay = setDay;
        }
    }
}
// end widget parameter //-------------------------------------------------->>>.
// Main
if (config.runsInWidget) {
    if (!(args.shortcutParameter)) {
        let wid = await rw(false);
        Script.setWidget(wid);
        Script.complete();
    }
}
else if (args.shortcutParameter) {
    let input = args.shortcutParameter.split(" ");
    let p = currentPariod;
    let d = currentDay;
    if (input[0].toLowerCase().trim() == "getSubject".toLowerCase().trim() || input[0].toLowerCase().trim() == "getSubjectName".toLowerCase().trim()) {
        switch (input.length) {
            case 2:
                try {
                    p = parseInt(input[1]);
                }
                catch (e) { }
                ;
                break;
            case 3:
                try {
                    p = parseInt(input[2]);
                    d = parseInt(input[1]);
                }
                catch (e) { }
                ;
                break;
            default: ;
        }
        if (input[0].toLowerCase().trim() == "getSubject".toLowerCase().trim()) {
            let s = ClassData.get(d).getSubject(p);
            Script.setShortcutOutput(s ? s.getLocaleSpeakString() : "มีบางอย่างผิดพลาด! เอ๋ ได้ยังไง?! มันเป็นไปไม่ได้นี่น่า");
        }
        else if (input[0].toLowerCase().trim() == "getSubjectName".toLowerCase().trim()) {
            let s = ClassData.get(d).getSubject(p);
            Script.setShortcutOutput(s ? s.getName() : "มีบางอย่างผิดพลาด! เอ๋ ได้ยังไง?! มันเป็นไปไม่ได้นี่น่า");
        }
        Script.complete();
    }
    else if (input[0].toLowerCase().trim() == "getSubjectList".toLowerCase().trim()) {
        if (input.length == 2) {
            try {
                d = parseInt(input[1]);
            }
            catch (e) { }
        }
        Script.setShortcutOutput(ClassData.get(d).getLocaleSubjectList());
        Script.complete();
    }
    else if (input[0].toLowerCase().trim() == "getNextSubject".toLowerCase().trim()) {
        if (input.length == 2) {
            try {
                p += parseInt(input[1]);
            }
            catch (e) { }
        }
        else {
            p++;
        }
        let s = currentSubjectDay.getSubject(p);
        Script.setShortcutOutput(s ? s.getLocaleSpeakString() : "ไม่มีวิชานี้ในฐานข้อมูล.");
        Script.complete();
    }
    else {
        Script.setShortcutOutput("Error : มีบางอย่างผิดพลาด");
        Script.complete();
    }
}
// [--function declare--]
/**
 * สร้าง widget และค่าในแต่ละ layout
 * @author Sittipat Tepsutar
 * @returns {Promise<ListWidget>} Promise > ListWidget
 */
async function createWidget() {
    let hwid = new ListWidget();
    // default color
    hwid.backgroundColor = new Color("#00DD55", 0.6);
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
    }
    else {
        widgetSmallSize = 30 + padding;
        widgetLargeSize = 170 + padding;
    }
    // inner background color
    let innerBackgroundColor = Color.dynamic(new Color("#FFFFFF", 0.2), new Color("#000000", 0.2));
    // background image
    try {
        let imggg = await getRandomBackgroundImage();
        if (imggg)
            hwid.backgroundImage = imggg;
    }
    catch (e) {
        hwid.backgroundGradient = getOfflineBackGroundColor();
    }
    switch (widgetFamily) {
        /*--------------------------
        // Small/.       Widget >>>
        ----------------------------*/
        case "small": {
            // โครงสร้าง layout
            // hwid layout  
            let head = hwid.addStack();
            let l0 = hwid.addStack(); //เส้นแบ่ง
            let title = hwid.addStack();
            let l1 = hwid.addStack(); //เส้นแบ่ง
            let time = hwid.addStack();
            let l2 = hwid.addStack(); //เส้นแบ่ง
            let body = hwid.addStack();
            let l3 = hwid.addStack(); //เส้นแบ่ง
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
                let tc = title.addText("คาบที่ " + (currentPariod + 1));
                tc.font = new Font("default", 9);
                let t0 = title.addText("กำลังเรียนวิชา 📖");
                t0.font = new Font("default", 12);
                let t1 = title.addText(currentSubject ? currentSubject.getName() : "NULL");
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
                let t0 = time1.addText(currentSubject ? currentSubject.getLocaleTime() : "NULL");
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
                    let ch = currentPariod + i + 1;
                    let t0;
                    let s = currentSubjectDay.getSubject(ch);
                    t0 = body1.addText(s ? `: ${s.getName()}` : ": ");
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
                let t0 = end.addText("⚠️ตามตารางเรียนของ " + ClassData.getClassName());
                t0.font = new Font("default", 8);
                t0.lineLimit = 1;
                end.addSpacer();
            }
            return new Promise((resolve, reject) => {
                hwid ? resolve(hwid) : reject(null);
            });
        }
        case "medium": {
            /*-------------------
               Medium widget >>>
            ---------------------*/
            let t1 = hwid.addText("Not available " + new Date().getSeconds());
            t1.centerAlignText();
            return new Promise((resolve, reject) => {
                hwid ? resolve(hwid) : reject(null);
            });
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
            title110.size = new Size(title11.size.width * 0.9 / 2, title11.size.height);
            title111.size = new Size(title11.size.width * 1.1 / 2, title11.size.height);
            title110.layoutVertically();
            title111.layoutVertically();
            title110.setPadding(0, 5, 5, 0);
            title111.setPadding(0, 5, 5, 1);
            //head layout
            let h0 = head.addStack();
            let lh01 = head.addStack();
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
            hello.size = new Size(info.size.width, info.size.height * 7.5 / 25);
            hello.centerAlignContent();
            let day = info.addStack();
            day.size = new Size(info.size.width, info.size.height * 10 / 25);
            day.centerAlignContent();
            //present font,color
            let pf = new Font("Arial", 12);
            let pc = new Color("#FFFF00", 1);
            //font
            let f = new Font("Arial", 12);
            //b0 layout , value set
            for (let i = 0; i <= 3; i++) {
                let ci = i;
                if (currentPariod == -1) {
                    ci++;
                }
                let ch = currentPariod + ci;
                let b0i = b0.addStack();
                b0i.centerAlignContent();
                b0i.size = new Size(b0.size.width, b0.size.height / 4);
                let t;
                if (currentSubjectDay.getSubject(ch - 1)) {
                    t = b0i.addText(ch.toString());
                }
                else {
                    t = b0i.addText("");
                }
                if (currentPariod + 1 == ch) {
                    t.font = pf;
                    t.textColor = pc;
                }
                else {
                    t.font = f;
                }
            }
            //b1 layout , value set
            for (let i = 0; i <= 3; i++) {
                let ci = i;
                if (currentPariod == -1) {
                    ci++;
                }
                let ch = currentPariod + ci;
                let bi = b1.addStack();
                bi.centerAlignContent();
                bi.size = new Size(b1.size.width, b1.size.height / 4);
                let t;
                let s = currentSubjectDay.getSubject(ch - 1);
                // if (currentSubjectDay.getSubject(ch - 1)) {
                //     t = bi.addText(currentSubjectDay.getSubject(ch - 1).getName());
                // } else {
                //     t = bi.addText("");
                // }
                t = bi.addText(s ? s.getName() : "");
                if (currentPariod + 1 == ch) {
                    t.font = pf;
                    t.textColor = pc;
                }
                else {
                    t.font = f;
                }
                t.lineLimit = 1;
                bi.addSpacer();
            }
            //b2 layout , value set
            for (let i = 0; i <= 3; i++) {
                let ci = i;
                if (currentPariod == -1) {
                    ci++;
                }
                let ch = currentPariod + ci;
                let bi = b2.addStack();
                bi.centerAlignContent();
                bi.size = new Size(b2.size.width, b2.size.height / 4);
                let t;
                let s = currentSubjectDay.getSubject(ch - 1);
                // if (currentSubjectDay.getSubject(ch - 1)) {
                //     t = bi.addText(currentSubjectDay.getSubject(ch - 1).getLocaleTime());
                // } else {
                //     t = bi.addText("");
                // }
                t = bi.addText(s ? s.getLocaleTime() : "");
                bi.addSpacer();
                if (currentPariod + 1 == ch) {
                    t.font = pf;
                    t.textColor = pc;
                }
                else {
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
            let ct = title10.addText("คาบที่ " + (currentPariod + 1).toString());
            ct.font = new Font("Arial", 10);
            ct.lineLimit = 1;
            let t1T0 = title10.addText("กำลังเรียนวิชา 📖");
            t1T0.font = new Font("default", 15);
            t1T0.textColor = new Color("#FFFFAA", 1);
            let s = title10.addText(currentSubject ? currentSubject.getName() : "NULL");
            s.font = Font.boldSystemFont(18);
            s.textColor = Color.dynamic(new Color("#3333FF", 1), new Color("#BBBBFF", 1));
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
                    let ch = currentPariod + 1 + i;
                    let ct1;
                    let s = currentSubjectDay.getSubject(ch);
                    // if (currentSubjectDay.getSubject(ch)) {
                    //     ct1 = title111.addText(": " + currentSubjectDay.getSubject(ch).getName());
                    // } else {
                    //     ct1 = title111.addText(": ");
                    // }
                    ct1 = title111.addText(s ? `: ${s.getName()}` : `: `);
                    ct1.font = new Font("default", 10);
                    ct1.lineLimit = 1;
                }
            }
            //info value set
            cname.centerAlignContent();
            let cnameT = cname.addText("⚠️ตามตารางเรียนของ " + ClassData.getClassName());
            cnameT.font = new Font("default", 10);
            cnameT.centerAlignText();
            //hello value
            hello.layoutHorizontally();
            hello.bottomAlignContent();
            let helloT = hello.addText(getWelcome(currentMinutes));
            {
                let font = Font.boldSystemFont(16);
                helloT.font = font;
            }
            // day value
            let dayT = day.addDate(currentDate);
            {
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
                hwid ? resolve(hwid) : reject(null);
            });
    }
    return new Promise((resolve, reject) => {
        hwid ? resolve(hwid) : reject(null);
    });
}
/**
 * setWidget
 * @param {boolean} notify
 */
async function rw(notify) {
    let widget = await createWidget();
    if (notify) {
        let n = new Notification();
        n.title = "Debug";
        n.body = `${Script.name()} is refresh ; ${config.widgetFamily};`;
        n.sound = "event";
        n.addAction("Debug 1", "scriptable:///open/" + encodeURI(Script.name()));
        n.schedule();
    }
    return new Promise((f, r) => {
        widget ? f(widget) : r(null);
    });
}
/**
 * ส่งกลับวันจากนาที
 * @param {number} minute
 * @returns {Date} วัน
 * @author Sittipat Tepsutar
 */
function getDateFromMinute(minute) {
    let returndate = new Date();
    returndate.setHours(Math.floor(minute / 60));
    returndate.setMinutes(minute % 60);
    returndate.setSeconds(0);
    returndate.setMilliseconds(0);
    return returndate;
}
/**
 * คำนวนเวลา(ในรูปแบบข้อความ string)จากนาที
 * @param {number} minute
 * @returns เวลา
 * @author Sittipat Tepsutar
 * @see getDateFromMinute
 */
function getLocalTimeStringFromMinute(minute) {
    if (minute == Infinity)
        return "00:00";
    let pad = (d) => (d < 10) ? '0' + d.toString() : d.toString();
    let t1 = getDateFromMinute(minute);
    return `${pad(t1.getHours())}:${pad(t1.getMinutes())}`;
}
/**
 * ฟังก์ชันนี้จะรับวัตถุวันมาแล้วจะส่งออกข้อมูลในรูปแบบตัวเลขในหน่วยนาทีตั้งแต่จุดเริ่มต้นของวัน
 * @param {Date} date วัตถุวันที่อยู่ในแม่พิมพ์ Date
 * @returns นาทีตั้งแต่จุดเริ่มต้นของวัน
 */
function getTimeMinute(date) {
    return date.getHours() * 60 + date.getMinutes();
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
    if (timeminute >= 1140)
        return "สวัสดีตอนกลางคืน";
    if (timeminute >= 960)
        return "สวัสดีตอนเย็น";
    if (timeminute >= 780)
        return "สวัสดีตอนบ่าย";
    if (timeminute >= 690)
        return "สวัสดีตอนกลางวัน";
    if (timeminute >= 540)
        return "สวัสดีตอนสาย";
    if (timeminute >= 300)
        return "สวัสดีตอนเช้า";
    return "สวัสดีตอนกลางคืน";
}
async function getRandomBackgroundImage(forceUrl) {
    let urlList;
    if (forceUrl) {
        urlList = [forceUrl];
    }
    else {
        if (Device.isUsingDarkAppearance()) {
            //Dark mode background image.
            urlList = [
                "https://variety.com/wp-content/uploads/2016/04/watership-down.jpg",
                "https://i.pinimg.com/originals/3b/8a/d2/3b8ad2c7b1be2caf24321c852103598a.jpg",
                "https://images2.alphacoders.com/110/1109233.jpg",
                "https://images.alphacoders.com/110/1109227.jpg",
                "https://images5.alphacoders.com/112/1123013.jpg",
                "https://image.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg"
            ];
        }
        else {
            //White mode background image.
            urlList = [
                "http://s-tlk.org/misc/watership_down-05.2014/watership_down_distance.png",
                "https://static01.nyt.com/images/2018/12/21/arts/21watership/21watership-superJumbo-v3.jpg",
                "https://cdn.shortpixel.ai/spai/w_1400+q_lossy+ret_img/https://www.donottellmyboss.com/wp-content/uploads/2013/08/green-white-background.jpg",
                "https://media.architecturaldigest.com/photos/58e2a407c0e88d1a6a20066b/2:1/w_1287,h_643,c_limit/Pyramid%20of%20Giza%201.jpg",
            ];
        }
        //Shuffle urlList
        shuffle(urlList);
    }
    //store Image
    let img;
    let errorInfo = "";
    for (let t of urlList) {
        try {
            let req = new Request(t);
            img = await req.loadImage();
            break;
        }
        catch (error) {
            errorInfo += `Skip ${t} : ${error.message}\n`;
        }
    }
    errorInfo && await notific("Error", errorInfo);
    return new Promise((resolve, reject) => {
        img ? resolve(img) : reject(null);
    });
}
function getOfflineBackGroundColor(index = getRndInteger(0, 5)) {
    let colors = [
        [new Color("#00DD55", 1), new Color("#009999", 1)],
        [new Color("#77c7da", 1), new Color("#44ae33", 1)],
        [new Color("#FFACBA", 1), new Color("#ABCDFF", 1)],
        [new Color("#ff0000", 1), new Color("#002cff", 1)],
        [new Color("#ff00e8", 1), new Color("#002cff", 1)],
        [new Color("#ef00ff", 1), new Color("#ffe700", 1)]
    ];
    let out = new LinearGradient();
    out.colors = colors[index];
    out.locations = [0, 1];
    return out;
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