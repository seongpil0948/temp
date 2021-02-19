from django.db import models
from django.contrib.postgres.fields import ArrayField


class BaseModel(models.Model):

    created_at = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=False,
        verbose_name="생성 일시",
        help_text="데이터가 생성된 날짜입니다.",
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        blank=True,
        null=False,
        verbose_name="수정 일시",
        help_text="데이터가 수정된 날짜입니다.",
    )

    class Meta:
        abstract = True


class BaseActiveModel(models.Model):

    is_active = models.BooleanField(
        default=True,
        db_index=True,
        verbose_name="활성화 여부",
        help_text="활성화할지 여부를 결정합니다.",
    )

    class Meta:
        abstract = True


# Create your models here.
class Widget(BaseModel, BaseActiveModel):
    shop = models.CharField(
        null=False,  # DB null ok
        blank=False,  # form blank ok
        verbose_name='의류 판매업체',
        help_text="의류 판매업체 상호 명을 나타냅니다.",
        max_length=50,
    )
    box_size = models.CharField(
        null=False,  # DB null ok
        blank=True,  # form blank ok
        verbose_name='추천목록 상자 크기',
        help_text="추천목록 상자의 크기(%)를 나타냅니다.",
        max_length=20,
        default="50"
    )
    num_of_item = models.IntegerField(
        null=False,  # DB null ok
        blank=True,  # form blank ok
        verbose_name='추천 아이템 개수',
        help_text="추천목록의 아이템 개수를 나타냅니다.",
        default=5
    )
    item_size = models.CharField(
        null=False,  # DB null ok
        blank=True,  # form blank ok
        verbose_name='이름',
        help_text="박스내 추천 아이템들의 크기(%)를 나타냅니다.",
        max_length=20,
        default="20"
    )
    custom_item_src = models.CharField(
        max_length=200,
        null=True,  # DB null ok
        blank=True,  # form blank ok
        verbose_name='사용자 설정 아이템 주소',
        help_text="사용자 설정 아이템 주소를 나타냅니다.",
    )
