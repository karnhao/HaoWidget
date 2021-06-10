class Subject {
    private width: number = 0;
    private startTime: number = 0;
    private period: number | null = -1;
    private name: string = "";
    private id: string = "";
    private roomId: string = "";
    private teacher: string[] = [];
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
        if (typeof number == "number" || number == null) {
            this.width = number;
        } else {
            throw new TypeError(`Parameter ต้องเป็นตัวเลขเท่านั้น. : ${number}`)
        }
    }
    /**
     * @param {Number} number หมายเลขคาบในวิชา.
     */
    public setPeriod(number: number | null): void {
        if (typeof number == "number" || !number) {
            if (!Number.isInteger(number) && number) throw new TypeError(`Parameter ต้องเป็นตัวเลขที่เป็นจำนวนเต็มเท่านั้น. : ${number}`);
            else this.period = number;
        } else {
            throw new TypeError(`Parameter ต้องเป็นตัวเลขเท่านั้น. : ${number}`);
        }
    }
    /**
     * @param {Number} time เวลาในหน่วยนาที นับตั้งแต่ 0:00น.
     */
    public setStartTime(time: number): void {
        this.startTime = time;
    }
    /**
     * 
     * @returns {String} รหัสวิชา
     */
    public getId(): string {
        return this.id;
    }
    public getLocaleId(): string {
        return this.getId() ? this.getId().replaceAll("", " ").trim() : "ไม่มีข้อมูล";
    }
    /**
     * 
     * @returns {String} ชื่อวิชา
     */
    public getName(): string {
        return this.name;
    }
    /**
     * 
     * @returns รายชื่อครูประจำวิชา (array).
     */
    public getTeacher(): string[] {
        return this.teacher;
    }
    /**
     * 
     * @returns รายชื่อครูประจำวิชาในภาษามนุษย์ทั่วไป
     */
    public getLocaleTeacherName(): string {
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
    public getRoomId(): string {
        return this.roomId;
    }
    /**
     * 
     * @returns {String}
     */
    public getLocaleRoomId(): string {
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
        return ` คาบที่ ${this.getLocalePeriod() + 1} ของวัน.\n เรียนวิชา : ${this.getName()}.\n รหัส : ${this.getLocaleId()}\n`
            + ` เรียนที่ : ${this.getLocaleRoomId()}\n`
            + ` ตั้งแต่เวลา : ${this.getLocaleStartTime()} น. ถึง ${this.getLocaleEndTime()} น.\n เป็นเวลา : ${this.getWidth()} นาที.\n`
            + ` ครูผู้สอนคือ : ${this.getLocaleTeacherName()}.`;
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
    public static getSubjectByDate(date: Date): Subject | null {
        if (date instanceof Date) {
            return this.get(date.getDay()).getSubjectByTime((date.getHours() * 60) + date.getMinutes());
        }
        throw new TypeError("Parameter ต้องเป็น object ในแม่พิมพ์ Date.");
    }

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
    public setSubject(subject: Subject[]): void {
        this.subject = subject;
        this.update();
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
                s.setWidth(this.subject.length > 0 ? ClassData.getStartTime() : Infinity);
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
                s.setWidth(Infinity);
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
    public getLocaleSubjectList(): string {
        if (!this.getSubjectList().length) {
            return "ไม่มีข้อมูล";
        }
        let out = "";
        this.getSubjectList().forEach((t) => {
            out += `${t.getLocaleString()}\n\n`;
        });
        return out;
    }

    public getDay(): number {
        return this.day;
    }
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
    if (minute == Infinity) {
        return "00:00";
    }
    let pad = (d: number) => (d < 10) ? '0' + d.toString() : d.toString();
    let t1 = getDateFromMinute(minute);
    return `${pad(t1.getHours())}:${pad(t1.getMinutes())}`;
}