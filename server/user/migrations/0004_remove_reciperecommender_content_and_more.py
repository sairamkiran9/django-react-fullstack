# Generated by Django 4.2.4 on 2024-07-16 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_reciperecommender'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reciperecommender',
            name='content',
        ),
        migrations.RemoveField(
            model_name='reciperecommender',
            name='created_at',
        ),
        migrations.AddField(
            model_name='reciperecommender',
            name='ingredients',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='reciperecommender',
            name='recipe',
            field=models.CharField(default='Unknown Recipe', max_length=255),
        ),
        migrations.AddField(
            model_name='reciperecommender',
            name='url',
            field=models.URLField(default='/'),
        ),
        migrations.AddField(
            model_name='reciperecommender',
            name='user_review',
            field=models.TextField(default=''),
        ),
    ]