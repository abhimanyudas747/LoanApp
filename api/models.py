from django.db import models
from django.utils import timezone
# Create your models here.




class Users(models.Model):
    UID = models.CharField(max_length=16, primary_key=True)
    Firstname = models.CharField(max_length=60)
    Lastname = models.CharField(max_length=60)

    DOB = models.DateField()
    Phone = models.CharField(max_length=12)
    LastUpdated = models.DateField(default=timezone.now, blank=True, null=True)



class Application(models.Model):
    AppID = models.AutoField(primary_key=True)
    UID = models.ForeignKey(Users, on_delete=models.CASCADE)
    Loanamt = models.FloatField(null=True)
    Duration = models.BigIntegerField(null=True)
    Installment = models.FloatField(null=True)
    Frequency = models.CharField(max_length=60, null=True)
    Type = models.CharField(max_length=60, null=True)
    Datefiled = models.DateField(default=timezone.now, blank=True)
    Status = models.CharField(max_length=60, null=True)


class Assets(models.Model):
    AppID = models.ForeignKey(Application, on_delete=models.CASCADE)
    MonthlyIncome = models.BigIntegerField(null=True, blank=True)
    CashCheckingAccounts = models.BigIntegerField(null=True, blank=True)
    CashSavingsAccounts = models.BigIntegerField(null=True, blank=True)
    Securities = models.CharField(max_length=500, null=True, blank=True)
    PersonalProperty = models.CharField(max_length=60, null=True, blank=True)
    RealEstate = models.CharField(max_length=60, null=True, blank=True)

class Loandetails(models.Model):
    AppID = models.ForeignKey(Application, on_delete=models.CASCADE)
    Duration = models.BigIntegerField(null=True, blank=True)
    Address_HB = models.CharField(max_length=300, blank=True, null=True)
    Valuation_HB = models.BigIntegerField(null=True, blank=True)
    Dealer_VH = models.CharField(max_length=100, null=True, blank=True)
    Vehiclemake_VH = models.CharField(max_length=20, null=True, blank=True)
    Currentval_VH = models.BigIntegerField(null=True, blank=True)

class Typea(models.Model):
    AppID = models.ForeignKey(Application, on_delete=models.CASCADE)
    ann_inc = models.BigIntegerField()
    comp_bonds = models.BigIntegerField()
    debt_mutual_funds = models.BigIntegerField()
    equity_mutual_funds = models.BigIntegerField()
    other_mutual_funds = models.BigIntegerField()
    reason = models.CharField(max_length=500)

class Typeb(models.Model):
    AppID = models.ForeignKey(Application, on_delete=models.CASCADE)
    ann_inc = models.BigIntegerField()
    comp_bonds = models.BigIntegerField()
    debt_mutual_funds = models.BigIntegerField()
    reason = models.CharField(max_length=500)


def upload_path(upload, filename):
    return '/'.join(['usr_docs',str(upload.AppID.AppID), upload.Type, filename])


class Uploads(models.Model):
    AppID = models.ForeignKey(Application, on_delete=models.CASCADE)
    Type = models.CharField(max_length=10)
    File = models.FileField(null=True, blank=True, upload_to=upload_path)

class Kycinfo(models.Model):
    AppID = models.ForeignKey(Application, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    addrline1 = models.CharField(max_length=500)
    addrline2 = models.CharField(max_length=500, blank=True, null=True)
    PIN = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    caddrline1 = models.CharField(max_length=500)
    caddrline2 = models.CharField(max_length=500, blank=True, null=True)
    cPIN = models.CharField(max_length=10)
    ccity = models.CharField(max_length=100)
    cdistrict = models.CharField(max_length=100)
    cstate = models.CharField(max_length=100)
