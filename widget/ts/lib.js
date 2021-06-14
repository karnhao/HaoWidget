var Subject = /** @class */ (function () {
    function Subject(name) {
        this.width = 0;
        this.startTime = 0;
        this.period = -1;
        this.name = "";
        this.id = "";
        this.roomId = "";
        this.teacher = [];
        if (name) {
            this.name = name;
        }
    }
    /**
     *
     * @param {String} id รหัสวิชา.
     */
    Subject.prototype.setId = function (id) {
        this.id = id;
    };
    /**
     *
     * @param {String} name ชื่อวิชา.
     */
    Subject.prototype.setName = function (name) {
        if (typeof name == "string") {
            this.name = name;
            return;
        }
        throw new TypeError("Parameter ต้องเป็น string.");
    };
    /**
     *
     * @param  {String[]} teacher รายชื่อครูประจำวิชา (array).
     */
    Subject.prototype.setTeacher = function (teacher) {
        this.teacher = teacher;
    };
    /**
     *
     * @param {String} roomId ชื่อห้องเรียนหรือรหัสห้องเรียน.
     */
    Subject.prototype.setRoomId = function (roomId) {
        this.roomId = roomId;
    };
    /**
     *
     * @param {Number} number ระยะเวลาเรียน หน่วยเป็นนาที.
     */
    Subject.prototype.setWidth = function (number) {
        if (typeof number == "number" || number == null) {
            this.width = number;
        }
        else {
            throw new TypeError("Parameter \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19. : " + number);
        }
    };
    /**
     * @param {Number} number หมายเลขคาบในวิชา.
     */
    Subject.prototype.setPeriod = function (number) {
        if (typeof number == "number" || !number) {
            if (!Number.isInteger(number) && number)
                throw new TypeError("Parameter \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E15\u0E47\u0E21\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19. : " + number);
            else
                this.period = number;
        }
        else {
            throw new TypeError("Parameter \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19. : " + number);
        }
    };
    /**
     * @param {Number} time เวลาในหน่วยนาที นับตั้งแต่ 0:00น.
     */
    Subject.prototype.setStartTime = function (time) {
        this.startTime = time;
    };
    /**
     *
     * @returns {String} รหัสวิชา
     */
    Subject.prototype.getId = function () {
        return this.id;
    };
    Subject.prototype.getLocaleId = function () {
        return this.getId() ? this.getId().replaceAll("", " ").trim() : "ไม่มีข้อมูล";
    };
    /**
     *
     * @returns {String} ชื่อวิชา
     */
    Subject.prototype.getName = function () {
        return this.name;
    };
    /**
     *
     * @returns รายชื่อครูประจำวิชา (array).
     */
    Subject.prototype.getTeacher = function () {
        return this.teacher;
    };
    /**
     *
     * @returns รายชื่อครูประจำวิชาในภาษามนุษย์ทั่วไป
     */
    Subject.prototype.getLocaleTeacherName = function () {
        if (!this.getTeacher()) {
            return "ไม่มีข้อมูล";
        }
        var t_arr = this.teacher;
        var out = "";
        for (var i = 0; i < t_arr.length; i++) {
            out += (i == t_arr.length - 1) ? "" + t_arr[i] : t_arr[i] + " \u0E41\u0E25\u0E30 ";
        }
        return out;
    };
    /**
     *
     * @returns ชื่อห้องเรียนหรือรหัสห้องเรียน.
     */
    Subject.prototype.getRoomId = function () {
        return this.roomId;
    };
    /**
     *
     * @returns {String}
     */
    Subject.prototype.getLocaleRoomId = function () {
        if (!this.getRoomId()) {
            return "ไม่มีข้อมูล";
        }
        var ins = this.getRoomId();
        var out = ins[0];
        for (var i = 1; i < ins.length; i++) {
            out += isNaN(Number(ins[i])) || ins[i].match("\\s+") || ins[i - 1].match("\\s+") ? ins[i] : " " + ins[i];
        }
        return out;
    };
    /**
     *
     * @returns ระยะเวลาเรียน หน่วยเป็นนาที.
     */
    Subject.prototype.getWidth = function () {
        return this.width;
    };
    /**
     *
     * @returns หมายเลขคาบในวิชา.
     */
    Subject.prototype.getPeriod = function () {
        return this.period;
    };
    Subject.prototype.getLocalePeriod = function () {
        var out = this.getPeriod();
        if (typeof (out) === 'number') {
            out++;
            return out.toString();
        }
        return "NULL";
    };
    /**
     *
     * @returns เวลาเมื่อเริ่มต้นคาบเรียนในรูปแบบนาทีที่นับตั้งแต่ 0:00น.
     */
    Subject.prototype.getStartTime = function () {
        return this.startTime;
    };
    Subject.prototype.getLocaleStartTime = function () {
        return getLocalTimeStringFromMinute(this.getStartTime());
    };
    /**
     *
     * @returns {Number} เวลาเมื่อจบคาบเรียนในรูปแบบนาทีที่นับตั้งแต่ 0:00น.
     */
    Subject.prototype.getEndTime = function () {
        return this.startTime + this.width;
    };
    Subject.prototype.getLocaleEndTime = function () {
        return getLocalTimeStringFromMinute(this.getEndTime());
    };
    Subject.prototype.getLocaleTime = function () {
        return this.getLocaleStartTime() + "-" + this.getLocaleEndTime();
    };
    /**
     * ส่งกลับข้อความที่เป็นภาษามนุษย์
     * @returns {String} ข้อความที่มนุษย์อ่านได้
     */
    Subject.prototype.getLocaleString = function () {
        return " \u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 " + (this.getLocalePeriod() + 1) + " \u0E02\u0E2D\u0E07\u0E27\u0E31\u0E19.\n \u0E40\u0E23\u0E35\u0E22\u0E19\u0E27\u0E34\u0E0A\u0E32 : " + this.getName() + ".\n \u0E23\u0E2B\u0E31\u0E2A : " + this.getLocaleId() + "\n"
            + (" \u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 : " + this.getLocaleRoomId() + "\n")
            + (" \u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E40\u0E27\u0E25\u0E32 : " + this.getLocaleStartTime() + " \u0E19. \u0E16\u0E36\u0E07 " + this.getLocaleEndTime() + " \u0E19.\n \u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E25\u0E32 : " + this.getWidth() + " \u0E19\u0E32\u0E17\u0E35.\n")
            + (" \u0E04\u0E23\u0E39\u0E1C\u0E39\u0E49\u0E2A\u0E2D\u0E19\u0E04\u0E37\u0E2D : " + this.getLocaleTeacherName() + ".");
    };
    return Subject;
}());
var ClassData = /** @class */ (function () {
    function ClassData() {
    }
    ClassData.get = function (day) {
        if (typeof (day) === 'number') {
            return SubjectDay.get(day);
        }
        return SubjectDay.get();
    };
    /**
     * สามารถโหลดหรือดูตัวอย่างข้อมูลดิบที่จะนำมาใส่ใน parameter ของฟังก์ชันนี้ได้ที่.
     *  - https://raw.githubusercontent.com/karnhao/HaoWidget/main/subject_data/6-10/6-10.json
     * @param {any} json ข้อมูลดิบ.
     */
    ClassData.setData = function (json) {
        this.setStartTime(json.startTime);
        this.setClassId(json.classId);
        this.setClassName(json.className);
        this.setNullSubject((function (data) {
            var s = new Subject();
            var raw_s = data.nullSubject;
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
        for (var i = 0; i < 7; i++) {
            var f = new Function('data', "return data.subjectList._" + i + ";");
            var sl = f(json);
            if (Array.isArray(sl)) {
                var s = [];
                var k = 0;
                // loop subject in subjectList.
                for (var _i = 0, sl_1 = sl; _i < sl_1.length; _i++) {
                    var j = sl_1[_i];
                    var raw_object = j;
                    var si = new Subject();
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
    };
    /**
     *
     * @param {Number} number เวลาเริ่มต้นคาบแรก นับตั้งแต่จุดเริ่มต้นของวัน (0:00น) หน่วยเป็นนาที.
     */
    ClassData.setStartTime = function (number) {
        this.data.startTime = number;
    };
    /**
     *
     * @param {any} id id ห้องเรียน.
     */
    ClassData.setClassId = function (id) {
        this.data.classId = id;
    };
    /**
     *
     * @param {String} name ชื่อห้องเรียน.
     */
    ClassData.setClassName = function (name) {
        this.data.className = name;
    };
    /**
     *
     * @param {Subject} subject วิชาว่าง
     */
    ClassData.setNullSubject = function (subject) {
        if (subject instanceof Subject) {
            this.data.nullSubject = subject;
            return;
        }
        throw new TypeError("Parameter ต้องเป็น object ใน Subject.");
    };
    /**
     *
     * @param {Date} date วัน.
     * @returns {Subject} วิชา.
     */
    ClassData.getSubjectByDate = function (date) {
        if (date instanceof Date) {
            return this.get(date.getDay()).getSubjectByTime((date.getHours() * 60) + date.getMinutes());
        }
        throw new TypeError("Parameter ต้องเป็น object ในแม่พิมพ์ Date.");
    };
    ClassData.getStartTime = function () {
        return this.data.startTime;
    };
    ClassData.getClassName = function () {
        return this.data.className;
    };
    ClassData.getClassId = function () {
        return this.data.classId;
    };
    /**
     *
     * @returns {Subject} วิชาว่าง.
     */
    ClassData.getNullSubject = function () {
        return this.data.nullSubject;
    };
    ClassData.data = {
        startTime: 0,
        classId: '',
        className: '',
        nullSubject: new Subject()
    };
    return ClassData;
}());
var SubjectDay = /** @class */ (function () {
    function SubjectDay(day) {
        this.subject = [];
        if (Number.isInteger(day)) {
            this.day = day;
            return;
        }
        throw new TypeError("Parameter ต้องเป็นจำนวนเต็ม");
    }
    SubjectDay.get = function (day) {
        if (day != null) {
            return this.sd[Math.floor(day)];
        }
        return this.sd;
    };
    /**
     * อัพเดตเวลาแต่ละคาบของทุกวัน.
     */
    SubjectDay.update = function () {
        this.sd.forEach(function (t) {
            t.update();
        });
    };
    /**
     * อัพเดตเวลาแต่ละคาบของวันนี้.
     * method นี้จะถูกเรียกใช้ตอนมีการเรียกใช้ setSubject
     */
    SubjectDay.prototype.update = function () {
        var t = ClassData.getStartTime();
        this.subject.forEach(function (k) {
            k.setStartTime(t);
            t += k.getWidth();
        });
    };
    /**
     *
     * @param  {Subject[]} subject
     */
    SubjectDay.prototype.setSubject = function (subject) {
        this.subject = subject;
        this.update();
    };
    /**
     *
     * @param {Number} p คาบเรียน index.
     * @returns {Subject} วิชา.
     */
    SubjectDay.prototype.getSubject = function (p) {
        // if period < 0
        if (p == -1) {
            var s = ClassData.getNullSubject();
            if (s) {
                s.setStartTime(0);
                s.setWidth(this.subject.length > 0 ? ClassData.getStartTime() : Infinity);
                s.setPeriod(-1);
            }
            return s;
        }
        var out = this.subject[Math.floor(p)];
        if (out != null) {
            // Normal value
            return out;
        }
        else if (p == this.subject.length && p != 0) {
            // End subject.
            var s = ClassData.getNullSubject();
            var last_subject = this.subject[this.subject.length - 1];
            if (s) {
                var last_subject_period = last_subject.getPeriod();
                s.setStartTime((last_subject) ? last_subject.getEndTime() : 0);
                s.setPeriod((last_subject && last_subject_period) ? last_subject_period + 1 : -1);
                s.setWidth(Infinity);
            }
            return s;
        }
        else {
            return null;
        }
    };
    /**
     *
     * @returns {Subject[]} วิชา
     */
    SubjectDay.prototype.getSubjectList = function () {
        return this.subject;
    };
    /**
     *
     * @param {Number} timeminute เวลาตั้งแต่จุดเริ่มต้นของวัน (0:00น) หน่วยเป็นนาที.
     * @returns {Subject} วิชา.
     */
    SubjectDay.prototype.getSubjectByTime = function (timeminute) {
        return this.getSubject(this.getPeriodByTime(timeminute));
    };
    /**
     *
     * @param {Number} timeminute เวลาตั้งแต่จุดเริ่มต้นของวัน (0:00น) หน่วยเป็นนาที.
     * @returns {Number} คาบ.
     */
    SubjectDay.prototype.getPeriodByTime = function (timeminute) {
        // example output : 
        // in < 500 => -1
        // in 500-549 => 0
        // in 550-599 => 1...
        if (timeminute < ClassData.getStartTime() || this.subject.length == 0) {
            return -1;
        }
        var p = 0;
        for (var _i = 0, _a = this.getSubjectList(); _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.getStartTime() <= timeminute && timeminute < i.getEndTime()) {
                return p;
            }
            p++;
        }
        return p;
    };
    /**
     *
     * @returns {String} ข้อมูลวิชาในวันนี้ที่มนุษย์สามารถอ่านได้ง่าย.
     */
    SubjectDay.prototype.getLocaleSubjectList = function () {
        if (!this.getSubjectList().length) {
            return "ไม่มีข้อมูล";
        }
        var out = "";
        this.getSubjectList().forEach(function (t) {
            out += t.getLocaleString() + "\n\n";
        });
        return out;
    };
    SubjectDay.prototype.getDay = function () {
        return this.day;
    };
    SubjectDay.sd = (function () {
        var out = [];
        for (var i = 0; i < 7; i++) {
            out.push(new SubjectDay(i));
        }
        return out;
    })();
    return SubjectDay;
}());
/**
 * ส่งกลับวันจากนาที
 * @param {number} minute
 * @returns {Date} วัน
 * @author Sittipat Tepsutar
 */
function getDateFromMinute(minute) {
    var returndate = new Date();
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
    if (minute == Infinity) {
        return "00:00";
    }
    var pad = function (d) { return (d < 10) ? '0' + d.toString() : d.toString(); };
    var t1 = getDateFromMinute(minute);
    return pad(t1.getHours()) + ":" + pad(t1.getMinutes());
}
