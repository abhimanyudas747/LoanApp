from django import forms
from .models import Application, Users, Assets, Loandetails, Typea, Typeb, Uploads, Kycinfo


class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = ['AppID', 'UID', 'Loanamt', 'Duration', 'Datefiled', 'Status', 'Installment', 'Frequency', 'Type']

class UserForm(forms.ModelForm):
    class Meta:
        model = Users
        fields = ['UID', 'Firstname', 'Lastname', 'DOB',
                  'Phone',	'LastUpdated']

# class Assets(forms.ModelForm):
#     class Meta:
#         model = Assets
#         fields = ['AppID', 'Firstname', 'Lastname',  'MonthlyIncome', 'DOB',
#                   'Phone',	'LastUpdated']

class Loandetails(forms.ModelForm):
    class Meta:
        model = Loandetails
        fields = ['AppID', 'Duration', 'Address_HB',  'Valuation_HB', 'Dealer_VH',
                  'Vehiclemake_VH',	'Currentval_VH']

class Typea(forms.ModelForm):
    class Meta:
        model = Typea
        fields = ["AppID", "ann_inc", "comp_bonds", "debt_mutual_funds", "equity_mutual_funds", "other_mutual_funds",
                  "reason"]

class Typeb(forms.ModelForm):
    class Meta:
        model = Typeb
        fields = ["AppID", "ann_inc", "comp_bonds", "debt_mutual_funds", "reason"]

class Uploads(forms.ModelForm):
    class Meta:
        model = Uploads
        fields = ["AppID", "Type", "File"]

class Kycinfo_form(forms.ModelForm):
    class Meta:
        model = Kycinfo
        fields = [
        'AppID',
        'name',
        'addrline1',
        'addrline2',\
        'PIN',
        'city',
        'district',
        'state',
            'caddrline1',
            'caddrline2', \
            'cPIN',
            'ccity',
            'cdistrict',
            'cstate',
        ]