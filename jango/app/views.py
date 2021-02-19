from rest_framework import status, viewsets, filters, mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.pagination import LimitOffsetPagination
from app.models import Widget
from app.serializer import WidgetModelSerializer
# Create your views here.


@api_view(['GET', 'POST'])
def from_cafe(request):
    print(request.data.get('msg', 'key msg not exist '))
    return Response("잘 받았습니다", status=status.HTTP_200_OK)


class GeneralLimitOffsetPagination(LimitOffsetPagination):
    limit_query_param = 'page_size'
    offset_query_param = 'offset'


class WidgetViewSet(viewsets.ModelViewSet):
    pagination_class = GeneralLimitOffsetPagination
    queryset = Widget.objects.all()
    serializer_class = WidgetModelSerializer
    filter_backends = (
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    ordering_fields = '__all__'
    search_fields = ['uuid']
    ordering = ['updated_at', 'created_at']
