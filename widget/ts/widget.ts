// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: magic;
/*
  วิทเจ็ท (วิจิท) แสดงตารางสอน.
  
  วิทเจ็ทนี้สามารถระบุคาบเรียน วิชาที่เรียน ณ ปัจจุบัน วิชาต่อไปของคาบเรียน และอื่นๆ ช่วยให้ผู้ใช้ไม่ต้องเปิดดูตารางสอนหรือตั้งเป็นพื้นหลังของหน้าจอ.
  เมื่อใช้งานแล้ว ถ้าว่างๆก็เข้ามาทำแบบสอบถามความพึงพอใจได้ที่.
    - https://forms.gle/As3pfDxbfUTYnfxP8
  
  ผู้เขียน : สิทธิภัทท์ เทพสุธา
  
  กฎและเงื่อนไขในการใช้งาน.
    - สามารถใช้งานได้ฟรี.
  
  วิธีใช้งาน.
    การเรียกใช้งาน.
    - แสดงผลผ่านทางวิทเจ็ท โดยมีวิธีดังนี้.
      1. เพิ่มวิทเจ็ดใหม่.
      2. เรียกใช้วิทเจ็ทผ่านทางแอพ scriptable.
      3. เลือก script นี้.
    - ระบบนี้สามารถแสดงผลที่แตกต่างกันในแต่ละขนาดของวิทเจ็ท (ขนาดเล็กและใหญ่).
    
    การตั้งค่าวิทเจ็ท.
    - สามารถกำหนดวันเองได้โดยวิธีดังนี้.
      1. กดหรือแตะค้างที่หน้าวิทเจ็ท.
      2. กดไปที่แก้ไข "scriptable".
      3. ไปที่ parameter.
      4. ใส่คำว่า setDay <number>
        <number> ให้ใส่ตัวเลขจำนวนเต็มระหว่าง 0 ถึง 6 โดยเลข 0 คือวันอาทิตย์ 1 คือวันจันทร์ 2 คือวันอังคาร ... 6 คือวันเสาร์.
      5. ออกและเสร็จสิ้น.

    การเรียกใช้ผ่านทางแอพ Shortcut ของ iOS
    - ShortcutParameter และไวยากรณ์ มีดีงนี้
      สำคัญ : 
              - <คาบเรียน> คือตัวเลขแทนคาบเรียน.
                โดยที่คาบเรียนที่ 1 จะเป็นเลข 0, คาบเรียนที่ 2 จะเป็นเลข 1, ..., คาบเรียนที่ n จะเป็น n-1 ในความหมายของระบบ.
              - <วัน> คือตัวเลขจำนวนเต็มระหว่าง 0 ถึง 6 แทนวัน, 0 คือวันอาทิตย์ 1 คือวันจันทร์ 2 คือวันอังคาร ... 6 คือวันเสาร์.
      1. getSubject <คาบเรียน> : ระบบจะส่งออกวิชาในรูปแบบข้อความสำหรับให้ ai อ่าน และเป็นภาษาที่มนุษย์อ่านฟังได้. วันจะเป็นวันปัจจุบันของเครื่อง.
      2. getSubject <วัน> <คาบเรียน> : ระบบจะส่งออกวิชาในรูปแบบข้อความสำหรับให้ ai อ่าน และเป็นภาษาที่มนุษย์อ่านฟังได้.
      3. getSubjectName <คาบเรียน> : ระบบจะส่งออกเฉพาะชื่อวิชา. วันจะเป็นวันปัจจุบันของเครื่อง.
      4. getSubjectName <วัน> <คาบเรียน> : ระบบจะส่งออกเฉพาะชื่อวิชา.
      5. getNextSubject <number> : <number> จะใส่หรือไม่ใส่ตัวเลขก็ได้ ถ้าไม่ใส่ ระบบจะถือว่าเป็นเลข 1. ระบบจะส่งออกวิชาในรูปแบบข้อความสำหรับให้ ai อ่าน และเป็นภาษาที่มนุษย์อ่านฟังได้. โดยวิชาจะอยู่ในคาบที่ : คาบปัจจุบัน + <number>.
      6. getSubjectList <วัน> : <วัน> จะใส่หรือไม่ใส่ตัวเลขก็ได้ ถ้าไม่ใส่ ระบบจะถือว่าเป็นวันปัจจุบัน. ระบบจะส่งออกทุกรายวิชาในวันนั้นๆ เป็นภาษาที่มนุษย์อ่านฟังได้.
*/

// การตั้งค่า


const data_url: string = "https://raw.githubusercontent.com/karnhao/HaoWidget/main/subject_data/6-10/6-10.json";    // url ที่ระบบจะไปโหลดข้อมูลมา.

const allow_replace: Boolean = true;   /* ถ้า true ระบบจะโหลดไฟล์ทุกๆครั้งที่มีการใช้งาน แล้วจะทับไฟล์ข้อมูลเก่า.
                                          ถ้า false ระบบจะไม่โหลดไฟล์ใหม่ถ้ามีไฟล์เดิมอยู่แล้ว
                                          false จะ ใช้ในกรณีมีอินเทอร์เน็ตจำกัด (คำเตือน ต้องเพิ่ม bookmark ที่ชื่อว่า HaoWidget ในแอพ Scriptable ก่อน โดยไปเพิ่มได้ที่การตั้งค่าภายในแอพ Scriptable ไม่เช่นนั้นระบบจะโหลดข้อมูลเก็บไว้ไม่ได้).*/


// code >>

var widgetFamily: string = config.widgetFamily;
Notification.removeAllPending();

// load/save file.
async function loadData(): Promise<any> {
    let fm = FileManager.local();
    let path: string | null = null;
    let raw_json: any = null;
    if (fm.bookmarkExists("HaoWidget")) {
        path = fm.bookmarkedPath("HaoWidget") + "/subject_data.json";
    } else {
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
        let request = new Request(data_url);
        try {
            if (!allow_replace && path && fm.fileExists(path)) {
                throw new Error("ไฟล์ข้อมูลมีอยู่แล้ว. สิทธิ allow_replace ถูกปฏิเสธ.");
            }
            raw_json = await request.loadJSON();
            if (path) {
                fm.writeString(path, JSON.stringify(raw_json));
            }
        } catch (e) {
            if (path && fm.fileExists(path)) {
                raw_json = JSON.parse(fm.readString(path));
            } else {
                throw new Error("การโหลดไฟล์ล้มเหลวและไม่พบไฟล์ข้อมูลเก่า. คำแนะนำ : ทำให้แน่ใจว่าอุปกรณ์เชื่อมต่อกับอินเทอร์เน็ตอยู่ และ refresh widget ใหม่.");
            }
        }
    }
    return new Promise((resolve, reject) => {
        resolve(raw_json);
    })
}

class Subject {
    private width: number = 0;
    private startTime: number = 0;
    private period: number | null = -1;
    private name: string | null = "";
    private id: string | null = "";
    private roomId: string | null = "";
    private teacher: string[] | null = [];
    private classroom: string | null = null;
    private meet: string | null = null;
    constructor(name?: string) {
        if (name) {
            this.name = name;
        }
    }
    /**
     * 
     * @param {String} id รหัสวิชา.
     */
    public setId(id: string): void {
        this.id = id;
    }
    /**
     * 
     * @param {String} name ชื่อวิชา.
     */
    public setName(name: string): void {
        this.name = name;
    }
    /**
     * 
     * @param  {String[]} teacher รายชื่อครูประจำวิชา (array).
     */
    public setTeacher(teacher: string[]): void {
        this.teacher = teacher;
    }
    /**
     * 
     * @param {String} roomId ชื่อห้องเรียนหรือรหัสห้องเรียน.
     */
    public setRoomId(roomId: string): void {
        this.roomId = roomId;
    }
    /**
     * 
     * @param {Number} number ระยะเวลาเรียน หน่วยเป็นนาที.
     */
    public setWidth(number: number): void {
        this.width = number;
    }
    /**
     * @param {Number} number หมายเลขคาบในวิชา.
     */
    public setPeriod(number: number | null): void {
        if (!Number.isInteger(number) && number) throw new TypeError(`Parameter ต้องเป็นตัวเลขที่เป็นจำนวนเต็มเท่านั้น. : ${number}`);
        else this.period = number;
    }
    /**
     * @param {Number} time เวลาในหน่วยนาที นับตั้งแต่ 0:00น.
     */
    public setStartTime(time: number): void {
        this.startTime = time;
    }
    /**
     * 
     * @param url url ห้องเรียน
     */
    public setClassroomUrl(url: string): void {
        this.classroom = url;
    }
    /**
     * 
     * @param url url เข้าห้องประชุม
     */
    public setMeetUrl(url: string): void {
        this.meet = url;
    }
    /**
     * 
     * @returns {String} รหัสวิชา
     */
    public getId(): string | null {
        return this.id;
    }

    public getLocaleId(): string {
        return this.id ? this.id : "";
    }

    /**
     * 
     * @returns {String} รหัสวิชาในรูปแบบที่ให้ ai อ่าน.
     */
    public getLocaleSpeakId(): string {
        return this.id ? ((inp: string[]): string => {
            let out: string = "";
            inp.forEach((t) => {
                out += isNaN(Number(t)) ? `${t}_,` : `${t}`;
            });
            return out.replaceAll("", " ").trim();
        })(this.id.replaceAll("", " ").trim().split(" ")) : "ไม่มีข้อมูล";
    }
    /**
     * 
     * @returns {String} ชื่อวิชา
     */
    public getName(): string | null {
        return this.name;
    }
    /**
     * 
     * @returns {String} ชื่อวิชา
     */
    public getLocaleName(): string {
        return this.name ? this.name : "";
    }
    /**
     * 
     * @returns รายชื่อครูประจำวิชา (array).
     */
    public getTeacher(): string[] | null {
        return this.teacher;
    }
    /**
     * 
     * @returns รายชื่อครูประจำวิชาในภาษามนุษย์ทั่วไป
     */
    public getLocaleTeacherName(): string {
        let t_arr = this.teacher;
        if (!t_arr) return "";
        let out = "";
        for (let i = 0; i < t_arr.length; i++) {
            out += (i == t_arr.length - 1) ? `${t_arr[i]}` : (i == t_arr.length - 2) ? `${t_arr[i]} และ ` : `${t_arr[i]}, `;
        }
        return out;
    }
    /**
     * 
     * @returns ชื่อห้องเรียนหรือรหัสห้องเรียน.
     */
    public getRoomId(): string | null {
        return this.roomId;
    }
    /**
     * 
     * @returns {String}
     */
    public getLocaleRoomId(): string {
        let ins = this.getRoomId();
        if (!ins) return "";
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
    public getWidth(): number {
        return this.width;
    }
    /**
     * 
     * @returns หมายเลขคาบในวิชา.
     */
    public getPeriod(): number | null {
        return this.period;
    }
    public getLocalePeriod(): string {
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
    public getStartTime(): number {
        return this.startTime;
    }
    public getLocaleStartTime(): string {
        return getLocalTimeStringFromMinute(this.getStartTime());
    }
    /**
     * 
     * @returns {Number} เวลาเมื่อจบคาบเรียนในรูปแบบนาทีที่นับตั้งแต่ 0:00น.
     */
    public getEndTime(): number {
        return this.startTime + this.width;
    }
    public getLocaleEndTime(): string {
        return getLocalTimeStringFromMinute(this.getEndTime());
    }
    public getLocaleTime(): string {
        return `${this.getLocaleStartTime()}-${this.getLocaleEndTime()}`;
    }
    /**
     * ส่งกลับข้อความที่เป็นภาษามนุษย์
     * @returns {String} ข้อความที่มนุษย์อ่านได้
     */
    public getLocaleString(): string {
        return ` คาบที่ ${this.getLocalePeriod()} ของวัน.\n เรียนวิชา : ${this.getName()}.\n รหัส : ${this.getLocaleId()}\n`
            + ` เรียนที่ : ${this.getLocaleRoomId()}\n`
            + ` ตั้งแต่เวลา : ${this.getLocaleStartTime()} น. ถึง ${this.getLocaleEndTime()} น.\n เป็นเวลา : ${this.getWidth()} นาที.\n`
            + ` ครูผู้สอนคือ : ${this.getLocaleTeacherName()}.`;
    }
    /**
     * ส่งกลับข้อความสำหรับให้ ai อ่าน.
     * @returns {String} ข้อความที่มนุษย์อ่านได้.
     */
    public getLocaleSpeakString(): string {
        return ` คาบที่ ${this.getLocalePeriod()} ของวัน.\n ` + (this.name ? `เรียนวิชา : ${this.getName()}.\n` : '') + (this.id ? ` รหัส : ${this.getLocaleSpeakId()}\n` : '')
            + (this.roomId ? ` เรียนที่ : ${this.getLocaleRoomId()}\n` : '')
            + ` ตั้งแต่เวลา : ${this.getLocaleStartTime()} น. ถึง ${this.getLocaleEndTime()} น.\n เป็นเวลา : ${this.getWidth()} นาที.`
            + (this.teacher ? `\n ครูผู้สอนคือ : ${this.getLocaleTeacherName()}.` : '');
    }
    public getClassroomUrl(): string | null {
        return this.classroom;
    }
    public getMeetUrl(): string | null {
        return this.meet;
    }
    public goClassroom(): void {
        if (!this.classroom) throw new Error("ไม่มีข้อมูล.");
        Safari.open(this.classroom);
    }
    public goMeet(): void {
        if (!this.meet) throw new Error("ไม่มีข้อมูล.");
        Safari.open(this.meet);
    }
}

interface RawData {
    startTime: number;
    classId: string;
    className: string;
    nullSubject: Subject;
}

class ClassData {

    private static data: RawData = {
        startTime: 0,
        classId: '',
        className: '',
        nullSubject: new Subject()
    }

    /**
     * 
     * @param {Number} day ตัวเลขจำนวนเต็ม. 
     * @returns {SubjectDay} จะส่งค่ากลับแบบ SubjectDay.
     */
    public static get(day: number): SubjectDay;
    /**
     * 
     * @param {Number} day ตัวเลขจำนวนเต็ม. 
     * @returns {SubjectDay[]} จะส่งค่ากลับในรูปแบบ Array.
     */
    public static get(): SubjectDay[];
    public static get(day?: any): SubjectDay | SubjectDay[] {
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
    public static setData(json: any) {
        this.setStartTime(json.startTime);
        this.setClassId(json.classId);
        this.setClassName(json.className);
        this.setNullSubject((function (data: any) {
            let s = new Subject();
            let raw_s = data?.nullSubject;
            s.setId(raw_s?.id);
            s.setName(raw_s?.name);
            s.setPeriod(null);
            s.setRoomId(raw_s?.roomId);
            s.setStartTime(0);
            s.setTeacher(raw_s?.teacher);
            s.setWidth(raw_s?.width);
            s.setClassroomUrl(raw_s?.classroom);
            s.setMeetUrl(raw_s?.meet);
            return s;
        })(json));

        // set Data from subjectList.
        // loop day 0 to 6.
        for (let i = 0; i < 7; i++) {
            let f = new Function('data', `return data.subjectList._${i};`);
            let sl = f(json);
            sl?.startTime && this.get(i).setStartTime(sl?.startTime);
            if (Array.isArray(sl.subjectList)) {
                let s = [];
                let k = 0;
                // loop subject in subjectList.
                for (let j of sl.subjectList) {
                    let raw_object = j;
                    let si = new Subject();
                    si.setName(raw_object?.name);
                    si.setId(raw_object?.id);
                    si.setPeriod(k);
                    si.setRoomId(raw_object?.roomId);
                    si.setTeacher(raw_object?.teacher);
                    si.setWidth(raw_object?.width);
                    si.setClassroomUrl(raw_object?.classroom);
                    si.setMeetUrl(raw_object.meet);
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
    public static setStartTime(number: number): void {
        this.data.startTime = number;
    }
    /**
     * 
     * @param {any} id id ห้องเรียน.
     */
    public static setClassId(id: string): void {
        this.data.classId = id;
    }
    /**
     * 
     * @param {String} name ชื่อห้องเรียน.
     */
    public static setClassName(name: string): void {
        this.data.className = name;
    }
    /**
     * 
     * @param {Subject} subject วิชาว่าง 
     */
    public static setNullSubject(subject: Subject): void {
        this.data.nullSubject = subject;
    }
    /**
     * 
     * @param {Date} date วัน.
     * @returns {Subject} วิชา.
     */
    public static getSubjectByDate(date: Date): Subject | null {
        return this.get(date.getDay()).getSubjectByTime(getTimeMinute(date));
    }
    /**
     * 
     * @returns startTime
     * @deprecated
     */
    public static getStartTime(): number {
        return this.data.startTime;
    }

    public static getClassName(): string {
        return this.data.className;
    }

    public static getClassId(): string {
        return this.data.classId;
    }
    /**
     * 
     * @returns {Subject} วิชาว่าง.
     */
    static getNullSubject(): Subject {
        return this.data.nullSubject;
    }
}

class SubjectDay {

    constructor(day: number) {
        if (Number.isInteger(day)) {
            this.day = day;
            return;
        }
        throw new TypeError("Parameter ต้องเป็นจำนวนเต็ม");
    }

    private subject: Subject[] = [];
    private day: number;
    private startTime: number = 0;

    private static sd: SubjectDay[] = (function () {
        let out = [];
        for (let i = 0; i < 7; i++) {
            out.push(new SubjectDay(i));
        }
        return out;
    })();

    public static get(day: number): SubjectDay;
    public static get(): SubjectDay[];
    public static get(day?: number): any {
        if (day != null) {
            return this.sd[Math.floor(day)] as any;
        }
        return this.sd;
    }

    /**
     * อัพเดตเวลาแต่ละคาบของทุกวัน.
     */
    public static update(): void {
        this.sd.forEach((t) => {
            t.update();
        });
    }

    /**
     * อัพเดตเวลาแต่ละคาบของวันนี้.
     * method นี้จะถูกเรียกใช้ตอนมีการเรียกใช้ setSubject
     */
    public update(): void {
        let t = this.getStartTime();
        this.subject.forEach((k) => {
            k.setStartTime(t);
            t += k.getWidth();
        });
    }
    /**
     * 
     * @param  {Subject[]} subject 
     */
    public setSubject(subject: Subject[]): void {
        this.subject = subject;
        this.update();
    }
    public setStartTime(startTime: number): void {
        this.startTime = startTime;
    }
    /**
     * 
     * @param {Number} p คาบเรียน index.
     * @returns {Subject} วิชา.
     */
    public getSubject(p: number): Subject | null {
        // if period < 0
        if (p == -1) {
            let s = ClassData.getNullSubject();
            if (s) {
                s.setStartTime(0);
                s.setWidth(this.subject.length > 0 ? this.getStartTime() : 1440);
                s.setPeriod(-1);
            }
            return s;
        }
        let out = this.subject[Math.floor(p)];
        if (out != null) {
            // Normal value
            return out;
        } else if (p == this.subject.length && p != 0) {
            // End subject.
            let s = ClassData.getNullSubject();
            let last_subject = this.subject[this.subject.length - 1];
            if (s) {
                let last_subject_period = last_subject.getPeriod();
                s.setStartTime((last_subject) ? last_subject.getEndTime() : 0);
                s.setPeriod((last_subject && last_subject_period) ? last_subject_period + 1 : -1);
                s.setWidth(1440 - s.getStartTime());
            }
            return s;
        } else {
            return null;
        }
    }
    /**
     * 
     * @returns {Subject[]} วิชา
     */
    public getSubjectList(): Subject[] {
        return this.subject;
    }
    public getStartTime(): number {
        return this.startTime;
    }

    /**
     * 
     * @param {Number} timeminute เวลาตั้งแต่จุดเริ่มต้นของวัน (0:00น) หน่วยเป็นนาที.
     * @returns {Subject} วิชา.
     */
    public getSubjectByTime(timeminute: number): Subject | null {
        return this.getSubject(this.getPeriodByTime(timeminute));
    }
    /**
     * 
     * @param {Number} timeminute เวลาตั้งแต่จุดเริ่มต้นของวัน (0:00น) หน่วยเป็นนาที.
     * @returns {Number} คาบ.
     */
    public getPeriodByTime(timeminute: number): number {
        // example output : 
        // in < 500 => -1
        // in 500-549 => 0
        // in 550-599 => 1...
        if (timeminute < this.getStartTime() || this.subject.length == 0) {
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
     * @returns {String} ข้อมูลรายวิชาในวันนี้ที่มนุษย์สามารถอ่านได้ง่าย.
     */
    public getLocaleSubjectList(): string {
        if (!this.getSubjectList().length) {
            return "ไม่มีข้อมูล";
        }
        let out = "";
        this.getSubjectList().forEach((t) => {
            out += `${t.getLocaleSpeakString()}\n\n`;
        });
        return out;
    }

    public getDay(): number {
        return this.day;
    }
}

// global current date day.
const currentDate = new Date();
var currentDay = currentDate.getDay();

// global variable.
/**
 * _เวลาที่เป็นหน่วยนาทีตั้งแต่ 0:00น ถึงปัจจุบัน._
 */
var currentMinutes: number;
var currentSubjectDay: SubjectDay = new SubjectDay(0);
var currentPariod: number = -1;
var currentSubject: Subject | null;

let innerBackgroundColor = Color.dynamic(new Color("#FFFFFF", 0.2), new Color("#000000", 0.2));

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

// [--function declare--]

// Main
async function main(): Promise<Boolean> {

    // SET DATA
    ClassData.setData(await loadData());

    // SET GLOBAL
    currentMinutes = getTimeMinute(currentDate);
    currentSubjectDay = ClassData.get(currentDay);
    currentPariod = currentSubjectDay.getPeriodByTime(currentMinutes);
    currentSubject = currentSubjectDay.getSubject(currentPariod);

    return new Promise((resolve, reject) => {
        resolve(config.runsInWidget);
    });
}

async function main_widget(): Promise<ListWidget> {
    let widget: ListWidget;
    if (!(args.shortcutParameter)) {
        try {
            widget = await rw(false);
        } catch (e) {
            throw new Error(e);
        }
    }
    return new Promise((resolve, reject) => {
        resolve(widget);
    });
}

function main_shortcut(): void {
    let input = args.shortcutParameter.split(" ");
    let p = currentPariod;
    let d = currentDay;
    let command = input[0].toLowerCase().trim();
    switch (command) {
        case "getsubject":
        case "getsubjectname":
        case "getsubjectclassroom":
        case "getsubjectmeet":
            switch (input.length) {
                case 2:
                    try {
                        p = parseInt(input[1]);
                    } catch (e) { };
                    break;
                case 3:
                    try {
                        p = parseInt(input[2]);
                        d = parseInt(input[1]);
                    } catch (e) { };
                    break;
                default: ;
            }
            let s = ClassData.get(d).getSubject(p);
            switch (command) {
                case "getsubject":
                    Script.setShortcutOutput(s ? s.getLocaleSpeakString() : "ไม่มีวิชานี้ในฐานข้อมูล.");
                    break;
                case "getsubjectname":
                    Script.setShortcutOutput(s ? s.getName() : "ไม่มีวิชานี้ในฐานข้อมูล.");
                    break;
                case "getsubjectclassroom":
                    if (s && s.getClassroomUrl()) {
                        Script.setShortcutOutput(s.getClassroomUrl());
                    }
                    break;
                case "getsubjectmeet":
                    if (s && s.getMeetUrl()) {
                        Script.setShortcutOutput(s.getMeetUrl());
                    }
                    break;
            }
            break;
        case "getsubjectlist":
            if (input.length == 2) {
                try {
                    d = parseInt(input[1]);
                } catch (e) { }
            }
            Script.setShortcutOutput(ClassData.get(d).getLocaleSubjectList());
            break;
        case "getnextsubject":
        case "getnextsubjectclassroom":
        case "getnextsubjectmeet":
            if (input.length == 2) {
                try {
                    p += parseInt(input[1]);
                } catch (e) { }
            } else {
                p++;
            }
            let ss = currentSubjectDay.getSubject(p);
            switch (command) {
                case "getnextsubject":
                    Script.setShortcutOutput(ss ? ss.getLocaleSpeakString() : "ไม่มีวิชานี้ในฐานข้อมูล.");
                    break;
                case "getnextsubjectclassroom":
                    if (ss && ss.getClassroomUrl()) {
                        Script.setShortcutOutput(ss.getClassroomUrl());
                        break;
                    }
                case "getnextsubjectmeet":
                    if (ss && ss.getMeetUrl()) {
                        Script.setShortcutOutput(ss.getMeetUrl());
                        break;
                    }
            }
            break;
        default: Script.setShortcutOutput("Error : มีบางอย่างผิดพลาด");
            break;
    }
}

/**
 * สร้าง widget และค่าในแต่ละ layout
 * @author Sittipat Tepsutar
 * @returns {Promise<ListWidget>} Promise > ListWidget
 */
async function createWidget(): Promise<ListWidget> {

    let hwid = new ListWidget();

    // default color
    hwid.backgroundColor = new Color("#00DD55", 0.6);

    /*.  ---[Widget Size Formula]---
    Small = 120 + padding, 120+ padding
    Medium = 240 + padding * 3, 120 + padding
    Large = 240 + padding * 3, 240 + padding * 3
         --------------------------- */

    const padding = ((Device.screenSize().width - 240) / 5);
    let widgetSmallSize: number;
    let widgetLargeSize: number;
    if (Device.model() == "iPhone") {
        widgetSmallSize = 118 + padding;
        widgetLargeSize = 240 + padding;
    } else {
        widgetSmallSize = 30 + padding;
        widgetLargeSize = 170 + padding;
    }

    // inner background color


    // background image
    try {
        let imggg = await getRandomBackgroundImage();
        if (imggg) hwid.backgroundImage = imggg;
    } catch (e) {
        hwid.backgroundGradient = getOfflineBackGroundColor();
    }

    switch (widgetFamily) {
        case "small": {
            return createSmallWidget(hwid, new Size(widgetSmallSize, widgetSmallSize));
        }
        case "medium": {
            return createMediumWidget(hwid, new Size(widgetLargeSize, widgetSmallSize));
        }
        case "large":
            return createLargeWidget(hwid, new Size(widgetLargeSize, widgetLargeSize));
    }
    return new Promise((resolve, reject) => {
        reject(null);
    });
}

/**
 * สร้าง widget ขนาดเล็ก และค่าในแต่ละ layout
 * @author Sittipat Tepsutar
 * @returns {Promise<ListWidget>} Promise > ListWidget
 * @param {ListWidget} widget widget.
 * @param {Size} size size.
 */
async function createSmallWidget(hwid: ListWidget, size: Size): Promise<ListWidget> {
    /*--------------------------
        Small.     Widget >>>
    ----------------------------*/
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
    head.size = new Size(size.width, size.height * 1 / 9);
    end.size = new Size(size.width, size.height * 1 / 9);
    time.size = new Size(size.width, size.height * 1 / 9);
    title.size = new Size(size.width, size.height * 3.5 / 9);
    body.size = new Size(size.width, size.height * 2.5 / 9);

    let lsize = new Size(size.width, 0.5);
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
        let t1 = title.addText(currentSubject ? currentSubject.getLocaleName() : "NULL");

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
            t0 = body1.addText(s ? `: ${s.getName()}` : ": ")

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

/**
 * สร้าง widget ขนาดกลาง และค่าในแต่ละ layout
 * @author Sittipat Tepsutar
 * @returns {Promise<ListWidget>} Promise > ListWidget
 * @param {ListWidget} widget widget.
 * @param {Size} size size.
 */
async function createMediumWidget(widget: ListWidget, size: Size): Promise<ListWidget> {
    /*-------------------
       Medium widget >>>
    ---------------------*/
    let lcolor = new Color("#FFFFFF", 0.5);
    let urlFont = Font.thinSystemFont(10);
    let urlColor = new Color("#B0FFFF", 1);
    let normalFont = Font.systemFont(10);
    let bigFont = Font.boldRoundedSystemFont(18);;
    let bigColor = new Color("#30CFFF", 1);

    // A layout
    let A = widget.addStack();
    A.size = new Size(size.width * 1.1, size.height);
    A.layoutHorizontally();
    A.setPadding(0, 0, 0, 0);
    A.cornerRadius = 10;
    A.backgroundColor = innerBackgroundColor;

    //a1
    let a1 = A.addStack();
    a1.size = new Size((A.size.width / 2) - 5, A.size.height);
    a1.layoutVertically();
    a1.setPadding(0, 0, 0, 0);

    //a1_b
    let a1_b1 = a1.addStack();
    a1_b1.size = a1.size;
    a1_b1.layoutVertically();
    a1_b1.setPadding(0, 0, 0, 0);

    //a1_b1_c
    let a1_b1_c1 = a1_b1.addStack();

    //a1_b1_c1_a1_b1_c2_spacer
    {
        let this_spacer = a1_b1.addStack();
        this_spacer.size = new Size(a1_b1.size.width, 1);
        this_spacer.borderColor = lcolor;
        this_spacer.borderWidth = 0.5;
    }

    let a1_b1_c2 = a1_b1.addStack();

    //a1_b1_c2_a1_b1_c3_spacer
    {
        let this_spacer = a1_b1.addStack();
        this_spacer.size = new Size(a1_b1.size.width, 1);
        this_spacer.borderColor = lcolor;
        this_spacer.borderWidth = 0.5;
    }

    let a1_b1_c3 = a1_b1.addStack();

    a1_b1_c1.size = new Size(a1_b1.size.width, a1_b1.size.height * 1 / 5);
    a1_b1_c2.size = new Size(a1_b1.size.width, a1_b1.size.height * 2 / 5);
    a1_b1_c3.size = new Size(a1_b1.size.width, a1_b1.size.height * 2 / 5);

    a1_b1_c1.layoutHorizontally();
    a1_b1_c2.layoutVertically();
    a1_b1_c3.layoutHorizontally();

    a1_b1_c1.setPadding(0, 0, 0, 0);
    a1_b1_c2.setPadding(0, 0, 0, 0);
    a1_b1_c3.setPadding(0, 0, 0, 0);

    //a1_b1_c1_d
    let a1_b1_c1_d1 = a1_b1_c1.addStack();
    let a1_b1_c1_d2 = a1_b1_c1.addStack();

    a1_b1_c1_d1.size = new Size(a1_b1_c1.size.width * 1 / 2, a1_b1_c1.size.height);
    a1_b1_c1_d2.size = new Size(a1_b1_c1.size.width * 1 / 2, a1_b1_c1.size.height);

    a1_b1_c1_d1.layoutVertically();
    a1_b1_c1_d2.layoutVertically();

    a1_b1_c1_d1.setPadding(0, 4, 0, 0);
    a1_b1_c1_d2.setPadding(0, 0, 0, 0);

    //a1_b1_c1_d2_e
    a1_b1_c1_d2.addSpacer();
    let a1_b1_c1_d2_e1 = a1_b1_c1_d2.addStack();
    a1_b1_c1_d2_e1.layoutHorizontally();
    a1_b1_c1_d2_e1.setPadding(0, 0, 0, 4);
    a1_b1_c1_d2.addSpacer();

    //a1_b1_c2_d
    let a1_b1_c2_d1 = a1_b1_c2.addStack();

    //a1_b1_c2_d1_a1_b1_c2_d2_spacer
    {
        let this_spacer = a1_b1_c2.addStack();
        this_spacer.size = new Size(a1_b1_c2.size.width, 1);
        this_spacer.borderColor = lcolor;
        this_spacer.borderWidth = 0.5;
    }

    let a1_b1_c2_d2 = a1_b1_c2.addStack();

    a1_b1_c2_d1.size = new Size(a1_b1_c2.size.width, a1_b1_c2.size.height * 3 / 4);
    a1_b1_c2_d2.size = new Size(a1_b1_c2.size.width, a1_b1_c2.size.height * 1 / 4);

    a1_b1_c2_d1.layoutVertically();
    a1_b1_c2_d2.layoutHorizontally();

    a1_b1_c2_d1.setPadding(0, 4, 0, 0);
    a1_b1_c2_d2.setPadding(0, 0, 0, 0);

    //a1_b1_c2_d2_e
    let a1_b1_c2_d2_e1 = a1_b1_c2_d2.addStack();
    let a1_b1_c2_d2_e2 = a1_b1_c2_d2.addStack();

    a1_b1_c2_d2_e1.size = new Size(a1_b1_c2_d2.size.width * 1 / 2, a1_b1_c2_d2.size.height);
    a1_b1_c2_d2_e2.size = new Size(a1_b1_c2_d2.size.width * 1 / 2, a1_b1_c2_d2.size.height);

    a1_b1_c2_d2_e1.layoutVertically();
    a1_b1_c2_d2_e2.layoutHorizontally();

    a1_b1_c2_d2_e1.setPadding(0, 4, 0, 0);
    a1_b1_c2_d2_e2.setPadding(0, 0, 0, 4);

    //a1_b1_c3_d
    let a1_b1_c3_d1 = a1_b1_c3.addStack();
    let a1_b1_c3_d2 = a1_b1_c3.addStack();

    a1_b1_c3_d1.size = new Size(a1_b1_c3.size.width * 1.1 / 3, a1_b1_c3.size.height);
    a1_b1_c3_d2.size = new Size(a1_b1_c3.size.width * 1.9 / 3, a1_b1_c3.size.height);

    a1_b1_c3_d1.layoutVertically();
    a1_b1_c3_d2.layoutVertically();

    a1_b1_c3_d1.setPadding(0, 4, 0, 0);
    a1_b1_c3_d2.setPadding(0, 0, 0, 3);

    //a1_a2_spacer
    A.addSpacer(5);
    let a1_a2_spacer = A.addStack();
    a1_a2_spacer.size = new Size(1, A.size.height);
    a1_a2_spacer.borderColor = lcolor;
    a1_a2_spacer.borderWidth = 0.5;
    A.addSpacer(5);

    //a2
    let a2 = A.addStack();
    a2.size = new Size((A.size.width / 2) - 5, A.size.height);
    a2.layoutVertically();
    a2.setPadding(0, 0, 0, 0);

    //a2_b
    let a2_b1 = a2.addStack();
    a2_b1.size = a2.size;
    a2_b1.layoutVertically();
    a2_b1.setPadding(0, 0, 0, 0);

    //a2_b1_c
    let a2_b1_c1 = a2_b1.addStack();

    //a2_b1_c1_a2_b1_c2_spacer
    {
        let this_spacer = a2_b1.addStack();
        this_spacer.size = new Size(a2_b1.size.width, 1);
        this_spacer.borderColor = lcolor;
        this_spacer.borderWidth = 0.5;
    }


    let a2_b1_c2 = a2_b1.addStack();

    //a2_b1_c2_a2_b1_c3_spacer
    {
        let this_spacer = a2_b1.addStack();
        this_spacer.size = new Size(a2_b1.size.width, 1);
        this_spacer.borderColor = lcolor;
        this_spacer.borderWidth = 0.5;
    }


    let a2_b1_c3 = a2_b1.addStack();

    a2_b1_c1.size = new Size(a1_b1.size.width, a1_b1.size.height * 1 / 5);
    a2_b1_c2.size = new Size(a1_b1.size.width, a1_b1.size.height * 2 / 5);
    a2_b1_c3.size = new Size(a1_b1.size.width, a1_b1.size.height * 2 / 5);

    a2_b1_c1.layoutVertically();
    a2_b1_c2.layoutVertically();
    a2_b1_c3.layoutHorizontally();

    a2_b1_c1.setPadding(0, 0, 0, 0);
    a2_b1_c2.setPadding(0, 0, 0, 0);
    a2_b1_c3.setPadding(0, 0, 0, 0);

    //a2_b1_c1_d
    let a2_b1_c1_d1 = a2_b1_c1.addStack();
    a2_b1_c1_d1.size = a2_b1_c1.size;
    a2_b1_c1_d1.layoutVertically();
    a2_b1_c1_d1.setPadding(0, 2, 0, 2);

    //a2_b1_c1_d1_e1
    a2_b1_c1_d1.addSpacer();
    let a2_b1_c1_d1_e1 = a2_b1_c1_d1.addStack();
    a2_b1_c1_d1.addSpacer();

    a2_b1_c1_d1_e1.layoutHorizontally();
    a2_b1_c1_d1_e1.setPadding(0, 3, 0, 3);

    //a2_b1_c2_d
    let a2_b1_c2_d1 = a2_b1_c2.addStack();

    //a2_b1_c2_d1_a2_b1_c2_d2_spacer
    {
        let this_spacer = a2_b1_c2.addStack();
        this_spacer.size = new Size(a2_b1_c2.size.width, 1);
        this_spacer.borderColor = lcolor;
        this_spacer.borderWidth = 0.5;
    }


    let a2_b1_c2_d2 = a2_b1_c2.addStack();

    a2_b1_c2_d1.size = new Size(a2_b1_c2.size.width, a2_b1_c2.size.height * 3 / 4);
    a2_b1_c2_d2.size = new Size(a2_b1_c2.size.width, a2_b1_c2.size.height * 1 / 4);

    a2_b1_c2_d1.layoutVertically();
    a2_b1_c2_d2.layoutHorizontally();

    a2_b1_c2_d1.setPadding(0, 4, 0, 0);
    a2_b1_c2_d2.setPadding(0, 0, 0, 0);

    //a2_b1_c2_d2_e
    let a2_b1_c2_d2_e1 = a2_b1_c2_d2.addStack();
    let a2_b1_c2_d2_e2 = a2_b1_c2_d2.addStack();

    a2_b1_c2_d2_e1.size = new Size(a2_b1_c2_d2.size.width * 1 / 2, a2_b1_c2_d2.size.height);
    a2_b1_c2_d2_e2.size = new Size(a2_b1_c2_d2.size.width * 1 / 2, a2_b1_c2_d2.size.height);

    a2_b1_c2_d2_e1.layoutVertically();
    a2_b1_c2_d2_e2.layoutHorizontally();

    a2_b1_c2_d2_e1.setPadding(0, 4, 0, 0);
    a2_b1_c2_d2_e2.setPadding(0, 0, 0, 4);

    //a2_b1_c3_d
    let a2_b1_c3_d1 = a2_b1_c3.addStack();
    let a2_b1_c3_d2 = a2_b1_c3.addStack();

    a2_b1_c3_d1.size = new Size(a2_b1_c3.size.width * 1.1 / 3, a2_b1_c3.size.height);
    a2_b1_c3_d2.size = new Size(a2_b1_c3.size.width * 1.9 / 3, a2_b1_c3.size.height);

    a2_b1_c3_d1.layoutVertically();
    a2_b1_c3_d2.layoutVertically();

    a2_b1_c3_d1.setPadding(0, 4, 0, 0);
    a2_b1_c3_d2.setPadding(0, 0, 0, 3);

    //a1_b1_c1_d1_text/design
    let w_classname = a1_b1_c1_d1.addText("");
    w_classname.lineLimit = 1;
    w_classname.font = normalFont;

    //a1_b1_c1_d2_text/design
    a1_b1_c1_d2_e1.addSpacer();
    let w_period = a1_b1_c1_d2_e1.addText("");
    w_period.lineLimit = 1;
    w_period.font = normalFont;

    //a1_b1_c2_d1_text/design
    let w_subject_text = a1_b1_c2_d1.addText("");
    let w_subject = a1_b1_c2_d1.addText("");

    w_subject_text.lineLimit = w_subject.lineLimit = 1;

    w_subject_text.font = normalFont;
    w_subject_text.textColor = new Color("#0004FF", 1);
    w_subject.font = bigFont;
    w_subject.textColor = bigColor;

    //a1_b1_c2_d2_e1_text/design
    let w_meet = a1_b1_c2_d2_e1.addText("");
    w_meet.lineLimit = 1;
    w_meet.font = urlFont;
    w_meet.textColor = urlColor;

    //a1_b1_c2_d2_e2_text/design
    a1_b1_c2_d2_e2.addSpacer();
    let w_classroom = a1_b1_c2_d2_e2.addText("");
    w_classroom.lineLimit = 1;
    w_classroom.font = urlFont;
    w_classroom.textColor = urlColor;

    //a1_b1_c3_d1_text/design
    let w_teacher_text = a1_b1_c3_d1.addText("");
    let w_room_text = a1_b1_c3_d1.addText("");
    let w_time_text = a1_b1_c3_d1.addText("");

    w_teacher_text.lineLimit = w_room_text.lineLimit = w_time_text.lineLimit = 1;
    w_teacher_text.font = w_room_text.font = w_time_text.font = normalFont;

    //a1_b1_c3_d2_text/design
    let w_teacher = a1_b1_c3_d2.addText("");
    let w_room = a1_b1_c3_d2.addText("");
    let w_time = a1_b1_c3_d2.addText("");

    w_teacher.lineLimit = w_room.lineLimit = w_time.lineLimit = 1;
    w_teacher.font = w_room.font = w_time.font = normalFont;

    //a2_b1_c1_d1_text/design
    a2_b1_c1_d1_e1.addSpacer();
    let w_date = a2_b1_c1_d1_e1.addDate(currentDate);
    a2_b1_c1_d1_e1.addSpacer();
    w_date.lineLimit = 1;
    w_date.font = Font.mediumRoundedSystemFont(15);
    w_date.minimumScaleFactor = 0.5;

    //a2_b1_c2_d1_text/design
    let w_next_subject_text = a2_b1_c2_d1.addText("");
    let w_next_subject = a2_b1_c2_d1.addText("");
    w_next_subject_text.lineLimit = w_next_subject.lineLimit = 1;
    w_next_subject_text.font = normalFont;
    w_next_subject_text.textColor = new Color("#0004FF", 1);
    w_next_subject.font = bigFont;
    w_next_subject.textColor = bigColor;

    //a2_b1_c2_d2_e1_text/design
    let w_next_meet = a2_b1_c2_d2_e1.addText("");
    w_next_meet.lineLimit = 1;
    w_next_meet.font = urlFont;
    w_next_meet.textColor = urlColor;

    //a2_b1_c2_d2_e2_text/design
    a2_b1_c2_d2_e2.addSpacer();
    let w_next_classroom = a2_b1_c2_d2_e2.addText("");
    w_next_classroom.lineLimit = 1;
    w_next_classroom.font = urlFont;
    w_next_classroom.textColor = urlColor;

    //a2_b1_c3_d1_text/design
    let w_next_teacher_text = a2_b1_c3_d1.addText("");
    let w_next_room_text = a2_b1_c3_d1.addText("");
    let w_next_time_text = a2_b1_c3_d1.addText("");

    w_next_teacher_text.lineLimit = w_next_room_text.lineLimit = w_next_time_text.lineLimit = 1;
    w_next_teacher_text.font = w_next_room_text.font = w_next_time_text.font = normalFont;

    //a2_b1_c3_d2_text/design
    let w_next_teacher = a2_b1_c3_d2.addText("");
    let w_next_room = a2_b1_c3_d2.addText("");
    let w_next_time = a2_b1_c3_d2.addText("");

    w_next_teacher.lineLimit = w_next_room.lineLimit = w_next_time.lineLimit = 1;
    w_next_teacher.font = w_next_room.font = w_next_time.font = normalFont;

    //value set >>>>>
    let currentMeet = currentSubject ? currentSubject.getMeetUrl() : null;
    let currentClassromm = currentSubject ? currentSubject.getClassroomUrl() : null;
    let nextSubject = currentSubjectDay.getSubject(currentPariod + 1);
    let nextMeet = nextSubject ? nextSubject.getMeetUrl() : null;
    let nextClassroom = nextSubject ? nextSubject.getClassroomUrl() : null;

    w_classname.text = `ชื่อ ${ClassData.getClassName()}`;
    w_period.text = `คาบที่ ${currentPariod + 1}`;
    w_subject_text.text = `กำลังเรียนวิชา 📖`;
    w_subject.text = currentSubject ? currentSubject.getLocaleName() : "NULL";
    if (currentMeet) {
        w_meet.text = "เข้าประชุม";
        w_meet.url = currentMeet;
    }
    if (currentClassromm) {
        w_classroom.text = "เข้าห้องเรียน";
        w_classroom.url = currentClassromm;
    }
    w_teacher_text.text = w_next_teacher_text.text = "ผู้สอน";
    w_room_text.text = w_next_room_text.text = "เรียนที่";
    w_time_text.text = w_next_time_text.text = "เวลา";
    w_teacher.text = currentSubject ? `: ${currentSubject.getLocaleTeacherName()}` : "ERROR:NULL";
    w_room.text = currentSubject ? `: ${currentSubject.getLocaleRoomId()}` : "ERROR:NULL";
    w_time.text = currentSubject ? `: ${currentSubject.getLocaleTime()}` : "ERROR:NULL";
    w_next_teacher.text = nextSubject ? `: ${nextSubject.getLocaleTeacherName()}` : ":";
    w_next_room.text = nextSubject ? `: ${nextSubject.getLocaleRoomId()}` : ":";
    w_next_time.text = nextSubject ? `: ${nextSubject.getLocaleTime()}` : ":";
    w_next_subject_text.text = "วิชาต่อไป ▶";
    w_next_subject.text = nextSubject ? nextSubject.getLocaleName() : " ";
    if (nextMeet) {
        w_next_meet.text = "เข้าประชุม";
        w_next_meet.url = nextMeet;
    }
    if (nextClassroom) {
        w_next_classroom.text = "เข้าห้องเรียน";
        w_next_classroom.url = nextClassroom;
    }

    return new Promise((resolve, reject) => {
        resolve(widget);
    });
}

/**
 * สร้าง widget ขนาดเล็ก และค่าในแต่ละ layout
 * @author Sittipat Tepsutar
 * @returns {Promise<ListWidget>} Promise > ListWidget
 * @param {ListWidget} widget widget.
 * @param {Size} size size.
 */
async function createLargeWidget(hwid: ListWidget, size: Size): Promise<ListWidget> {

    /*-------------------
       Large widget >>>
    ---------------------*/

    //line
    let lc = new Color("#FFFFFF", 0.5);


    //Title , Chart
    let title = hwid.addStack();
    title.size = new Size(size.width * 1.1, size.height * 1.4 / 3);

    let lw0 = hwid.addStack();
    lw0.size = new Size(title.size.width, 0.5);
    lw0.backgroundColor = lc;
    let chart = hwid.addStack();

    chart.size = new Size(size.width * 1.1, size.height * 2 / 3);
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

    title11.layoutVertically();
    title10.layoutVertically();

    title10.setPadding(0, 5, 0, 0);


    //title11 layout
    let title110 = title11.addStack();
    let title111 = title11.addStack();

    //title11 layout size,design 2.0
    title110.size = new Size(title11.size.width, title11.size.height * 1 / 2);
    title111.size = new Size(title11.size.width, title11.size.height * 1 / 2);

    title110.layoutHorizontally();
    title111.layoutHorizontally();

    //title110,title111 layout <- title11 2.0
    let title110_name = title110.addStack();
    let title111_name = title111.addStack();
    let title110_value = title110.addStack();
    let title111_value = title111.addStack();

    title110_name.layoutVertically();
    title111_name.layoutVertically();
    title110_value.layoutVertically();
    title111_value.layoutVertically();

    //title110 name,value design
    title110_name.size = new Size(title110.size.width * 0.6 / 2, title110.size.height);
    title110_value.size = new Size(title110.size.width * 1.4 / 2, title110.size.height);

    title110_name.setPadding(0, 5, 0, 0);
    title110_value.setPadding(0, 0, 0, 1);

    //title111 name,value design
    title111_name.size = new Size(title110_name.size.width, title111.size.height);
    title111_value.size = new Size(title110_value.size.width, title111.size.height);

    title111_name.setPadding(0, 5, 0, 0);
    title111_value.setPadding(0, 0, 0, 1);

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
        if (currentPariod == -1) {
            ci++;
        }
        let ch = currentPariod + ci;
        let b0i = b0.addStack();
        b0i.centerAlignContent();
        b0i.size = new Size(b0.size.width, b0.size.height / 4);
        let t: WidgetText;
        if (currentSubjectDay.getSubject(ch - 1)) {
            t = b0i.addText(ch.toString());
        } else {
            t = b0i.addText("");
        }
        if (currentPariod + 1 == ch) {
            t.font = pf;
            t.textColor = pc;
        } else {
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
        let t: WidgetText;
        let s = currentSubjectDay.getSubject(ch - 1);
        t = bi.addText(s ? s.getLocaleName() : "");

        if (currentPariod + 1 == ch) {
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
        if (currentPariod == -1) {
            ci++;
        }
        let ch = currentPariod + ci;
        let bi = b2.addStack();
        bi.centerAlignContent();
        bi.size = new Size(b2.size.width, b2.size.height / 4);
        let t: WidgetText;
        let s = currentSubjectDay.getSubject(ch - 1);
        t = bi.addText(s ? s.getLocaleTime() : "");

        bi.addSpacer();
        if (currentPariod + 1 == ch) {
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
    let ct = title10.addText("คาบที่ " + (currentPariod + 1).toString());
    ct.font = new Font("Arial", 10);
    ct.lineLimit = 1;

    let t1T0 = title10.addText("กำลังเรียนวิชา 📖");
    t1T0.font = new Font("default", 15);
    t1T0.textColor = new Color("#FFFFAA", 1)

    let s = title10.addText(currentSubject ? currentSubject.getLocaleName() : "NULL");

    s.font = Font.boldSystemFont(18);
    s.textColor = Color.dynamic(new Color("#3333FF", 1), new Color("#BBBBFF", 1));
    s.lineLimit = 1;

    t1l0.size = new Size(title10.size.width, 0.5);
    t1l0.backgroundColor = lc;

    title110_name.addSpacer();
    title110_value.addSpacer();

    {
        let ct1 = title110_name.addText("เรียนที่");
        ct1.font = new Font("default", 12);
        ct1.lineLimit = 1;

        let ct2 = title111_name.addText("ผู้กำกับ");
        ct2.font = new Font("default", 12);
        ct2.lineLimit = 1;
        title111_name.addSpacer();
    }
    {
        let this_font: Font = new Font("default", 12);
        let ct1: WidgetText;
        ct1 = title110_value.addText(currentSubject?.getRoomId() ? `: ${currentSubject.getRoomId()}` : `: `);
        ct1.font = this_font;
        ct1.lineLimit = 1;

        let ct2: WidgetText;
        ct2 = title111_value.addText(currentSubject?.getTeacher() ? `: ${currentSubject.getLocaleTeacherName()}` : `: `);
        ct2.font = this_font;
        ct2.lineLimit = 1;
        title111_value.addSpacer();
    }

    //info value set
    cname.centerAlignContent();
    let cnameT = cname.addText("⚠️ตามตารางเรียนของ " + ClassData.getClassName());
    cnameT.font = new Font("default", 10);
    cnameT.centerAlignText();


    //hello value
    hello.layoutHorizontally();
    hello.bottomAlignContent();
    let helloT = hello.addText(getWelcome(currentMinutes)); {
        let font = Font.boldSystemFont(16);
        helloT.font = font;
        helloT.lineLimit = 1;
        helloT.minimumScaleFactor = 0.2;
    }


    // day value
    let dayT = day.addDate(currentDate); {
        let font = Font.boldSystemFont(16);
        dayT.font = font;
        dayT.centerAlignText();
        dayT.lineLimit = 1;
        dayT.minimumScaleFactor = 0.2;
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

/**
 * setWidget
 * @param {boolean} notify 
 */
async function rw(notify: boolean): Promise<ListWidget> {
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
function getDateFromMinute(minute: number): Date {
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
function getLocalTimeStringFromMinute(minute: number): string {
    if (minute == Infinity) return "00:00";
    let pad = (d: number) => (d < 10) ? '0' + d.toString() : d.toString();
    let t1 = getDateFromMinute(minute);
    return `${pad(t1.getHours())}:${pad(t1.getMinutes())}`;
}

/**
 * ฟังก์ชันนี้จะรับวัตถุวันมาแล้วจะส่งออกข้อมูลในรูปแบบตัวเลขในหน่วยนาทีตั้งแต่จุดเริ่มต้นของวัน
 * @param {Date} date วัตถุวันที่อยู่ในแม่พิมพ์ Date
 * @returns นาทีตั้งแต่จุดเริ่มต้นของวัน
 */
function getTimeMinute(date: Date) {
    return date.getHours() * 60 + date.getMinutes();
}

function getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function notific(title: string, text: string): Promise<void> {
    let n = new Notification();
    n.title = title;
    n.body = text;
    return n.schedule();
}

function getWelcome(timeminute: number) {
    if (timeminute >= 1140) return "สวัสดีตอนกลางคืน";
    if (timeminute >= 960) return "สวัสดีตอนเย็น";
    if (timeminute >= 780) return "สวัสดีตอนบ่าย";
    if (timeminute >= 690) return "สวัสดีตอนกลางวัน";
    if (timeminute >= 540) return "สวัสดีตอนสาย";
    if (timeminute >= 300) return "สวัสดีตอนเช้า";
    return "สวัสดีตอนกลางคืน";
}

async function getRandomBackgroundImage(forceUrl?: string): Promise<Image | null> {
    let urlList: string[];
    if (forceUrl) {
        urlList = [forceUrl];
    } else {
        if (Device.isUsingDarkAppearance()) {
            //Dark mode background image.
            urlList = [
                "https://variety.com/wp-content/uploads/2016/04/watership-down.jpg",
                "https://i.pinimg.com/originals/3b/8a/d2/3b8ad2c7b1be2caf24321c852103598a.jpg",
                "https://images2.alphacoders.com/110/1109233.jpg",
                "https://images.alphacoders.com/110/1109227.jpg",
                "https://images5.alphacoders.com/112/1123013.jpg",
                "https://image.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg"
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
        urlList.sort(() => Math.random() - 0.5);
    }

    //store Image
    let img: Image;
    let errorInfo = "";

    for (let t of urlList) {
        try {
            let req = new Request(t);
            img = await req.loadImage();
            break;
        } catch (error) {
            errorInfo += `Skip ${t} : ${error.message}\n`;
        }
    }

    errorInfo && await notific("Error", errorInfo);

    return new Promise((resolve, reject) => {
        img ? resolve(img) : reject(null);
    });
}

function getOfflineBackGroundColor(index: number = getRndInteger(0, 5)) {
    let colors: Color[][] = [
        [new Color("#00DD55", 1), new Color("#009999", 1)],
        [new Color("#77c7da", 1), new Color("#44ae33", 1)],
        [new Color("#FFACBA", 1), new Color("#ABCDFF", 1)],
        [new Color("#ff0000", 1), new Color("#002cff", 1)],
        [new Color("#ff00e8", 1), new Color("#002cff", 1)],
        [new Color("#ef00ff", 1), new Color("#ffe700", 1)]
    ];
    let out = new LinearGradient();
    out.colors = colors[index];
    out.locations = [0, 1]
    return out;
}

function getSplashText(): string {
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
        (function (): string {
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

if (config.runsInWidget || args.shortcutParameter) {
    if (await main()) {
        let t = await main_widget();
        Script.setWidget(t);
    } else if (args.shortcutParameter) {
        main_shortcut();
    }
    Script.complete();
}

// END

// Make this file a module
export { ClassData }