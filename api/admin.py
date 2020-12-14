from django.contrib import admin
from .models import Application, Users, Assets, Loandetails, Typeb, Typea, Uploads, Kycinfo
# Register your models here.

admin.site.register(Application)
admin.site.register(Users)
admin.site.register(Assets)
admin.site.register(Loandetails)
admin.site.register(Typea)
admin.site.register(Typeb)
admin.site.register(Uploads)
admin.site.register(Kycinfo)