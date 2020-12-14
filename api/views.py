from django.http import HttpResponse, JsonResponse
from django.views.defaults import bad_request
from django.views.decorators.csrf import csrf_exempt
from .forms import ApplicationForm, UserForm, Loandetails, Typea, Typeb, Kycinfo_form
from django.utils import timezone
from .models import Application, Users, Uploads, Kycinfo
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.db.models import Max
from django.forms.models import model_to_dict
from shutil import copy2
from rest_framework.decorators import parser_classes
from rest_framework.parsers import FileUploadParser



# Create your views here.

@csrf_exempt
def ApplicationView(request):

    if request.method == "POST":
        post_data = dict(request.POST)
        newapp = ApplicationForm(request.POST)
        if(newapp.is_valid()):
            newapp.save()
            appid = Application.objects.all().aggregate(Max('AppID'))
            return JsonResponse({'Status': 'OK', 'AppID': appid})
        else:
            print(newapp.errors)
            return JsonResponse({'Status': 'INVINP'})

    else:
        return bad_request(request, "GET not allowed")

def current_date(request):
    x = timezone.localtime()
    return HttpResponse(x)

def get_record(request):
    if request.method == "POST":
        return bad_request(request, "POST not allowed here")
    params = request.GET
    if(params.get('AppID', -1) == -1):
        return JsonResponse({'Status' : 'NOAPPID'})
    context = {}
    context['Record'] = list(Application.objects.filter(AppID=params['AppID']).values())
    context['Status'] = "OK"
    if(context['Record'] == []):
        context['Status'] = "NOTFOUND"
    return JsonResponse(context)

def get_user(request):
    if request.method == "POST":
        return bad_request(request, "POST not allowed here")
    params = request.GET
    if(params.get('UID', -1) == -1):
        return JsonResponse({'Status' : 'NOUID'})
    context = {}
    context['Record'] = list(Users.objects.filter(UID=params['UID']).values())
    context['Status'] = "OK"
    if(context['Record'] == []):
        context['Status'] = "NOTFOUND"
    return JsonResponse(context)

@csrf_exempt
def update_status(request):
    if request.method == 'GET':
        return bad_request(request, "GET not allowed")
    post_data = dict(request.POST)
    newStatus = post_data['newStatus'][0]
    AppID = post_data['AppID'][0]
    if(Application.objects.filter(AppID=AppID).update(Status=newStatus)):
        return JsonResponse({'Status': 'SUCCESS'})
    else:
        return JsonResponse({'Status': 'FAILED'})

@csrf_exempt
def add_user(request):
    if request.method == "POST":
        post_data = dict(request.POST)
        newapp = UserForm(request.POST)
        #print(request.POST)
        if(newapp.is_valid()):
            newapp.save()
            return JsonResponse({'Status': 'OK'})
        else:
            print(newapp.errors)
            return JsonResponse({'Status': 'INVINP'})

    else:
        return bad_request(request, "GET not allowed")

@csrf_exempt
def signup(request):
    if request.method == "POST":
        params = dict(request.POST)
        myuser = User.objects.create_user(params['uid'][0], params['email'][0],params['password'][0])
        tok = Token.objects.get_or_create(user=myuser)
        return JsonResponse({"Status": "OK", "Token": tok[0].key, "User": params['uid'][0]})
    else:
        return bad_request(request, "BAD Request")

@csrf_exempt
def signin(request):
    if request.method == "POST":
        params = dict(request.POST)
        curr_user = authenticate(username=params['uid'][0], password=params['password'][0])
        if curr_user is not None:
            print(curr_user)
            tok = Token.objects.get_or_create(user=curr_user)
            return JsonResponse({"Status": "OK", "user": params['uid'][0], "Token": tok[0].key})

        else:
            print("Failed")
            return JsonResponse({"Status": "Failed"})

    else:
        return bad_request(request, "Bad request")


class test(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

class count_app(APIView):

    def get(self, request):
        cnt = Application.objects.count()
        content = {'Count': cnt}
        return Response(content)

class get_rec_by_usr(APIView):
    def get(self, request):
        params = request.GET
        if (params.get('UID', -1) == -1):
            return JsonResponse({'Status': 'NOUID'})
        context = {}
        context['Record'] = list(Application.objects.filter(UID=params['UID']).values())
        context['Status'] = "OK"
        if (context['Record'] == []):
            context['Status'] = "NOTFOUND"
        return Response(context)

class add_loandetails(APIView):
    def post(self, request):
        if request.method == "POST":
            post_data = dict(request.POST)
            newapp = Loandetails(request.POST)
            #print(request.POST)
            if(newapp.is_valid()):
                newapp.save()
                return JsonResponse({'Status': 'OK'})
            else:
                print(newapp.errors)
                return JsonResponse({'Status': 'INVINP'})

        else:
            return bad_request(request, "GET not allowed")


class add_typea(APIView):
    def post(self, request):
        if request.method == "POST":
            post_data = dict(request.POST)
            newapp = Typea(request.POST)
            #print(request.POST)
            if(newapp.is_valid()):
                newapp.save()
                return JsonResponse({'Status': 'OK'})
            else:
                print(newapp.errors)
                return JsonResponse({'Status': 'INVINP'})

    def get(self, request):
        return JsonResponse({"ERR":"GET not allowed"})




class add_typeb(APIView):
    def post(self, request):
        if request.method == "POST":
            post_data = dict(request.POST)
            newapp = Typeb(request.POST)
            #print(request.POST)
            if(newapp.is_valid()):
                newapp.save()
                return JsonResponse({'Status': 'OK'})
            else:
                print(newapp.errors)
                return JsonResponse({'Status': 'INVINP'})

        else:
            return bad_request(request, "GET not allowed")

class Upload(APIView):
    #parser_classes = (FileUploadParser,)
    def post(self, request):
        if request.method == "POST":
            # post_data = dict(request.POST)
            # print(request.data)
            # newapp = Uploads(request.data)
            # print(newapp)
            # #print(request.POST)
            # if(newapp.is_valid()):
            #     newapp.save()
            #     print("Success")
            #     return JsonResponse({'Status': 'OK'})
            # else:
            #     print(newapp.errors)
            #     return JsonResponse({'Status': 'INVINP'})
            AppID = request.data['AppID']
            AppInst = Application.objects.get(AppID=AppID)
            Type = request.data['Type']
            File = request.data['File']
            Uploads.objects.create(AppID=AppInst, Type=Type, File=File)
            #copy2('./media/usr_docs/'+AppID, './loanappclient/build/static/media/')
            return JsonResponse({"Status": "OK"})

    def get(self, request):
        return JsonResponse({"ERR":"GET not allowed"})

class add_kycinfo(APIView):
    def post(self, request):
        if request.method == "POST":
            post_data = dict(request.POST)
            newapp = Kycinfo_form(request.POST)
            #print(request.POST)
            if(newapp.is_valid()):
                newapp.save()
                return JsonResponse({'Status': 'OK'})
            else:
                print(newapp.errors)
                return JsonResponse({'Status': 'INVINP'})

        else:
            return bad_request(request, "GET not allowed")

class get_docs(APIView):
    def get(self, request):
        params = request.GET
        if (params.get('AppID', -1) == -1):
            return Response({'Status': 'NOAPPID'})
        context = {}
        rec = list(Uploads.objects.filter(AppID=params['AppID']).values())
        if (rec == []):
            context['Status'] = "NOTFOUND"
            return Response(context)
        if(rec[0]['Type'] == "photo"):
            context["photo"] = rec[0]['File']
            context["addr"] = rec[1]['File']
        else:
            context["photo"] = rec[1]['File']
            context["addr"] = rec[0]['File']
        context['Status'] = "OK"

        return Response(context)

class get_kycinfo(APIView):
    def get(self, request):
        params = request.GET
        if (params.get('AppID', -1) == -1):
            return Response({'Status': 'NOAPPID'})
        try:
            context = model_to_dict(Kycinfo.objects.get(AppID=params['AppID']))
        except:
            context = {}
            context['Status'] = "NOTFOUND"
            return Response(context)


        context['Status'] = "OK"

        return Response(context)


