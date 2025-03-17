import json
import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.serializers.json import DjangoJSONEncoder
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Post, Course_table

logger = logging.getLogger("django")

@api_view(['GET'])
def add_post(request):
    title = request.GET.get('title', '')
    content = request.GET.get('content', '')
    photo = request.GET.get('photo', '')
    location = request.GET.get('location', '')

    new_post = Post()
    new_post.title = title
    new_post.content = content
    new_post.photo = photo
    new_post.location = location
    new_post.save()

    logger.debug(" ************** myhello_api: " + title)

    if title:
        return Response({"data": title + " insert!"}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"res": "parameter: name is None"},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    return Response({
        "data": json.dumps(
            list(posts),
            sort_keys=True,
            indent=1,
            cls=DjangoJSONEncoder
        )
    }, status=status.HTTP_200_OK)

# 回傳課程列表
@csrf_exempt
def courselist(request):
    courses = Course_table.objects.all()
    data = []
    for course in courses:
        data.append({
            "id": course.id,
            "Department": course.Department,
            "CourseTitle": course.CourseTitle,
            "Instructor": course.Instructor
        })
    return JsonResponse(data, safe=False)

@csrf_exempt
def addcourse(request):
    dept = request.GET.get('department')
    title = request.GET.get('coursetitle')
    instructor = request.GET.get('instructor')

    if dept and title and instructor:
        course = Course_table.objects.create(
            Department=dept,
            CourseTitle=title,
            Instructor=instructor
        )
        return JsonResponse({
            "message": "新增成功！",
            "id": course.id
        })
    else:
        return JsonResponse({"error": "缺少參數！"})