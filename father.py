from flask import Flask
from flask import request
from flask_cors import CORS
import json
import pymysql
app = Flask(__name__)
app.config['SECRET_KEY'] = '123456'
CORS(app, supports_credentials=True) 
@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    identity = data['identity']
    try: 
        db = pymysql.connect("localhost","root","","leavenote")
        print("数据库连接成功")
        cursor = db.cursor()
        if identity == "部门成员":
            sql = """select * from stuinfo s,classmanage c where s.stuID = c.managerStuID and stuID = '%s' and stuPwd = '%s'"""%(username,password)
            n = cursor.execute(sql)
            if n == 1:
                return "部门登录成功"  
            else:
                return "登录失败"
        elif identity == "学生":
            sql = """select * from stuinfo where stuID = '%s' and stuPwd = '%s'"""%(username,password)
            n = cursor.execute(sql)
            if n == 1:
                return "学生登录成功"  
            else:
                return "登录失败"
        elif identity == "生活委员":
            sql = """select * from stuinfo s,classmanage c where s.stuID = c.managerStuID and stuID = '%s' and stuPwd = '%s'"""%(username,password)
            n = cursor.execute(sql)
            if n == 1:
                return "生活委员登录成功"  
            else:
                return "登录失败" 
        elif identity == "班主任":
            sql = """select * from admininfo a,classmanage c where a.adminID = c.managerTeaID and a.adminID = '%s' and adminPwd = '%s'"""%(username,password)
            n = cursor.execute(sql)
            if n == 1:
                return "班主任登录成功"  
            else:
                return "登录失败" 
        elif identity == "辅导员":
            sql = """select * from admininfo a,departmentmanage d where a.adminID = d.counsellorID and d.counsellorID = '%s' and adminPwd = '%s'"""%(username,password)
            n = cursor.execute(sql)
            if n >= 1:
                return "辅导员登录成功"  
            else:
                return "登录失败"     
    except:
        return "登陆失败，账号或密码错误"
@app.route("/information", methods=['POST'])
def information():
    data = request.get_json()
    id = data['id']
    try: 
        db = pymysql.connect("localhost","root","","leavenote")
        print("数据库连接成功")
        cursor = db.cursor()  
        cursor1 = db.cursor()  
        cursor2 = db.cursor()
        cursor2.execute("""select stuName from stuinfo where stuID = '%s'"""%id)
        name = list(cursor2)[0][0]
        sql = """select * from stuinfo where stuName = '%s'"""%(name)
        sql2 = """select * from leanote l,stuinfo s where l.stuID = s.stuID and  stuName = '%s'"""%(name)
        sql1 = """select result,count(*) from leanote where stuID = %s group by result"""%id
        cursor2.execute(sql1)
        cursor.execute(sql)
        n = cursor1.execute(sql2)
        cursor = list(cursor)[0]
        result = {'stuID':cursor[0],'department':cursor[2],'major':cursor[3],'message':list(cursor2),'name':name,'classID':cursor[4],'stuTel':cursor[6],'times':n} 
        return json.dumps(result,ensure_ascii=False)
    except:
        return ""
@app.route("/leave", methods=['POST'])
def leave():
    data = request.get_json()
    Stuno = data['Stuno']
    phone = data['phone']
    reason = data['reason']
    begintime = data['begintime']
    endtime = data['endtime']
    submittime = data['submittime']
    type1 = data['type1']
    type2 = data['type2']
    try: 
        db = pymysql.connect("localhost","root","","leavenote")
        print("登陆成功")
        cursor = db.cursor()
        cursor1 = db.cursor()
        n = cursor.execute("select * from leanote")
        sql = "INSERT INTO leanote VALUES('%d','%s','%s','%s','%s','%s','%s','未审核','%s','%s')"%(n + 1,Stuno,str(submittime),begintime,endtime,reason,phone,type1,type2)
        sql1 = "INSERT INTO applicate VALUES('%d','','','','','','')"%(n + 1)
        cursor.execute(sql)
        cursor1.execute(sql1)
        db.commit()
        return "申请提交成功"      
    except:
        return "申请提交失败"
@app.route("/checklist", methods=['POST'])
def checklist():
    data = request.get_json()
    ids = data['id']
    version = data['version']
    try: 
        db = pymysql.connect("localhost","root","","leavenote")
        print("数据库连接成功")
        cursor = db.cursor()  
        if version == '1':
            sql = """SELECT  DISTINCT stuName,startDate from leanote l,stuinfo s,classmanage c,departmentmanage d where s.department = d.department and s.stuID = l.stuID and c.classID = s.classID and managerStuID = '%s' AND startDate IS NOT null"""%(ids)
        elif version == '2':
            sql = """select distinct stuName,startDate from leanote l,stuinfo s,classmanage c,departmentmanage d where s.department = d.department and s.stuID = l.stuID and c.classID = s.classID and managerTeaID = '%s' AND startDate IS NOT null"""%(ids)
        else:
            sql = """SELECT  DISTINCT stuName,startDate from leanote l,stuinfo s,classmanage c,departmentmanage d where s.department = d.department and s.stuID = l.stuID and c.classID = s.classID and counsellorID = '%s' AND startDate IS NOT null"""%(ids)
        cursor.execute(sql)
        result = dict() 
        for i in cursor:
            if 'name' in result:
                result['name'] += ' ' + i[0]
            else:
                result['name'] = i[0]
            if 'time' in result:
                result['time'] += ' ' + i[1]
            else:
                result['time'] = i[1]
        print(result)
        return json.dumps(result,ensure_ascii=False)
    except:
        return "123"
@app.route("/showcheck", methods=['POST'])
def showcheck():
    data = request.get_json()
    name = data['name']
    try: 
        db = pymysql.connect("localhost","root","","leavenote")
        print("数据库连接成功")
        cursor = db.cursor()  
        sql = """select kind,s.stuName,s.stuID,releave,startDate,endDate,reason,s.stuTel from leanote l,stuinfo s where s.stuID = l.stuID and stuName = '%s'"""%(name)
        cursor.execute(sql)
        cursor = list(cursor)[0]
        result = {'kind':cursor[0],'stuName':cursor[1],'stuID':cursor[2],'releave':cursor[3],'tel':cursor[7],'startDate':cursor[4],'endDate':cursor[5],'reason':cursor[6]} 
        return json.dumps(result,ensure_ascii=False)
    except:
        return "123"
@app.route("/submityes", methods=['POST'])
def submityes():
    data = request.get_json()
    ids = data['id']
    time = data['time']
    version = data["type"]
    try: 
        db = pymysql.connect("localhost","root","","leavenote")
        print("数据库连接成功")
        cursor = db.cursor() 
        if version == '1':
            sql = """update applicate,leanote set stuPass = '1' where stuID = '%s' and startDate = '%s'  and leaNoteID = ApplicationID """%(ids,time)
        elif version == '2':
            sql = """update applicate,leanote set teaPass = '1' where stuID = '%s' and startDate = '%s'  and leaNoteID = ApplicationID """%(ids,time)
        else:
            sql = """update applicate,leanote set couPass = '1' where stuID = '%s' and startDate = '%s'  and leaNoteID = ApplicationID """%(ids,time)
        cursor.execute(sql)
        db.commit()
        sql = """update applicate,leanote set result = '已通过' where stuPass = '1' and teaPass = '1'  and couPass = '1' and  stuID = '%s' and startDate = '%s' and leaNoteID = ApplicationID"""%(ids,time)
        cursor.execute(sql)
        db.commit()
        return "同意请假！"
    except:
        return "操作异常"
@app.route("/submitno", methods=['POST'])
def submitno():
    data = request.get_json()
    ids = data['id']
    time = data['time']
    version = data["type"]
    reason = data["reason"]
    try: 
        db = pymysql.connect("localhost","root","","leavenote")
        print("数据库连接成功")
        cursor = db.cursor() 
        if version == '1':
            sql = """update applicate,leanote set stuPass = '0',stuRemarks = '%s'  where stuID = '%s' and startDate = '%s'  and leaNoteID = ApplicationID """%(reason,ids,time)
        elif version == '2':
            sql = """update applicate,leanote set teaPass = '0',teaRemarks = '%s' where stuID = '%s' and startDate = '%s'  and leaNoteID = ApplicationID """%(reason,ids,time)
        else:
            sql = """update applicate,leanote set couPass = '0',couRemarks = '%s' where stuID = '%s' and startDate = '%s'  and leaNoteID = ApplicationID """%(reason,ids,time)
        cursor.execute(sql)
        db.commit()
        sql = """update leanote set result = '未通过' where stuID = '%s' and startDate = '%s'"""%(ids,time)
        cursor.execute(sql)
        db.commit()
        return "拒绝请假！"
    except:
        return "操作异常"
@app.route("/process", methods=['POST'])
def process():
    data = request.get_json()
    ids = data['id']
    try: 
        db = pymysql.connect("localhost","root","","leavenote")
        print("数据库连接成功")
        cursor = db.cursor() 
        sql = """select stuPass,teaPass,couPass from applicate a,leanote l where l.leaNoteID = a.ApplicationID and l.stuID = '%s'"""%(ids)
        cursor.execute(sql)
        cursor = list(cursor)[0]
        n = 0
        k = 0#未审核
        for i in range(3):
            if cursor[i] == '1':
                n += 1
            elif cursor[i] == '0':
                k = 1#拒绝
                break
            elif cursor[i] == '':
                break
        if k == 1:
            if cursor[0] == '0':
                sql = """select stuRemarks from applicate a,leanote l where l.leaNoteID = a.ApplicationID and l.stuID = '%s'"""%(ids)
            elif cursor[1] == '0':
                sql = """select teaRemarks from applicate a,leanote l where l.leaNoteID = a.ApplicationID and l.stuID = '%s'"""%(ids)
            elif cursor[2] == '0':
                sql = """select couReamarks from applicate a,leanote l where l.leaNoteID = a.ApplicationID and l.stuID = '%s'"""%(ids)
            cursor1 = db.cursor() 
            cursor1.execute(sql)       
            cursor1 = list(cursor1)[0][0]
        else:
            cursor1 = ''
        result = {'result': n,'flag':k,'reason':str(cursor1)}
        return json.dumps(result,ensure_ascii=False)
    except:
        return "操作异常"
@app.route("/leavehistory", methods=['POST'])
def leavehistory():
    data = request.get_json()
    ids = data['id']
    try: 
        db = pymysql.connect("localhost","root","","leavenote")
        print("数据库连接成功")
        cursor = db.cursor() 
        sql = """select leaNoteID,endDate,result from leanote where stuID = '%s'"""%(ids)
        cursor.execute(sql)
        cursor = list(cursor)[0]
        result = {'id':cursor[0] ,'time':cursor[1],'yon':cursor[2]}
        return json.dumps(result,ensure_ascii=False)
    except:
        return "操作异常"
@app.route("/releave", methods=['POST'])
def releave():
    try: 
        db = pymysql.connect("localhost","root","","leavenote")
        print("数据库连接成功")
        cursor = db.cursor() 
        sql = """select * from releanote """
        cursor.execute(sql)
        result = dict()
        result['id'] = ''
        result['time1'] = ''
        result['flag'] = ''
        result['time2'] = ''
        cursor1 = db.cursor()
        for i in cursor:
            sql1 = """select stuID from leanote where stuID = '%s' and startDate <= '%s' and endDate >= '%s' and result = '已通过'"""%(i[0],i[1],i[1])
            n = cursor1.execute(sql1)
            if n >= 1:
                result['id'] += '%s '%i[0]
                result['time1'] += '%s '%i[1]
                result['flag'] += '已请假 '
                result['time2'] += '%s '%i[2]
            else:
                result['id'] += '%s '%i[0]
                result['time1'] += '%s '%i[1]
                result['flag'] += '已请假 '
                result['time2'] += '%s '%i[2]
        return json.dumps(result,ensure_ascii=False)
    except:
        return "操作异常"
@app.route("/cut", methods=['POST'])
def cut():
    try: 
        db = pymysql.connect("localhost","root","","leavenote")
        print("数据库连接成功")
        cursor = db.cursor() 
        sql = """SELECT * from depoint where depoint <> '0'  """
        cursor.execute(sql)
        result = dict()
        result['id'] = ''
        result['score'] = ''
        result['time'] = ''
        for i in cursor:
            result['id'] += '%s '%i[0]
            result['score'] += '%s '%i[1]
            result['time'] += '%s '%i[2]       
        print(result)
        return json.dumps(result,ensure_ascii=False)
    except:
        return "操作异常"
app.run()