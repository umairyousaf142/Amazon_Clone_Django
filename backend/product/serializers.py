from rest_framework import serializers
from .models import *


class AddProductSerializer(serializers.ModelSerializer):
    priceCents = serializers.IntegerField(source='price_cents')
    keywords = serializers.SerializerMethodField()

    rating = serializers.FloatField(min_value=0, max_value=5)
    rating_count = serializers.IntegerField()

    class Meta:
        model = addProduct
        fields = ['id', 'image', 'name', 'rating', 'rating_count', 'priceCents', 'keywords', 'product_id', 'word']

    def get_keywords(self, obj):
        return [obj.word] if obj.word else []

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data['rating'] = {
            "stars": instance.rating,
            "count": instance.rating_count
        }

        data['image'] = instance.image.url if instance.image else ""
        return data
