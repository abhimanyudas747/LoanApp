from django.urls import include, path
from .views import ApplicationView, current_date, get_record, update_status, add_user, signup, signin, test, get_user, \
    get_rec_by_usr, add_loandetails, add_typea, add_typeb, Upload, add_kycinfo, get_docs, get_kycinfo



urlpatterns = [
    path('new_app', ApplicationView),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('date', current_date),
    path('get_app/', get_record),
    path('get_usr/', get_user),
    path('update_app', update_status),
    path('new_user', add_user),
    path('signup', signup),
    path('signin', signin),
    path('test', test.as_view(), name="test"),
    path('get_rec_by_usr', get_rec_by_usr.as_view(), name="rec_usr"),
    path('add_loandetails', add_loandetails.as_view()),
    path('add_typea', add_typea.as_view()),
    path('add_typeb', add_typeb.as_view()),
    path('upload', Upload.as_view()),
    path('add_kyc', add_kycinfo.as_view()),
    path('get_docs', get_docs.as_view()),
    path('get_kycinfo', get_kycinfo.as_view())

]