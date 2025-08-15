# import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from cloudinary.models import CloudinaryField

# class addProduct(models.Model):
#     name = models.CharField(max_length=255)
#     product_id = models.CharField(max_length=100, unique=True)
#     image = models.ImageField(upload_to='products')  
#     price_cents = models.PositiveIntegerField()
#     rating = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(5)])
#     rating_count = models.PositiveIntegerField()
#     word = models.CharField(max_length=50, unique=True)

#     def __str__(self):
#         return self.name
    

class addProduct(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='products')  # ya ImageField agar upload kar rahe ho
    price_cents = models.PositiveIntegerField()
    rating_stars = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    rating_count = models.PositiveIntegerField()
    keywords = models.JSONField(default='key')  # List of strings

    def __str__(self):
        return self.name
