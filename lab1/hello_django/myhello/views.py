##from django.shortcuts import render
#from django.http import HttpResponse

## Create your views here.
#def myIndex(request):
    #my_name = request.GET.get('name' , "CGU")
    #my_name = request.POST.get('name' , "CGU")#GET:API參數呈現在url上(直接show出名字)，POST則相反
    #return HttpResponse("Hello " + my_name)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HelloApiView(APIView):
    def get(self, request):
        my_name = request.GET.get('name' , None)
        if my_name:
            retValue = {}
            retValue['data'] = "Hello" + my_name
            return Response(retValue, status=status.HTTP_200_OK)
        else:
            return Response(
                {"res": "parameter: name is None"},
                status=status.HTTP_400_BAD_REQUEST
            )