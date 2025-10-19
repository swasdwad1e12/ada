# Discord Mass DM Bot

## Overview
بوت ديسكورد يرسل رسائل خاصة (DM) لجميع أعضاء السيرفر باستخدام أمر slash command واحد.

## Purpose
- إرسال رسائل مهمة لجميع الأعضاء في السيرفر
- استخدام واجهة Modal بسيطة لإدخال محتوى الرسالة
- منشن المستخدم في نهاية كل رسالة

## Current State
✅ البوت يعمل بنجاح ومتصل بديسكورد

## Features
### MVP Features
1. **Slash Command**: `/send_to_all` - أمر لبدء عملية إرسال الرسائل
2. **Modal Interface**: واجهة بسيطة تحتوي على حقل واحد فقط (reason)
3. **Mass DM**: إرسال الرسالة لجميع الأعضاء (باستثناء البوتات)
4. **User Mention**: منشن المستخدم في آخر كل رسالة
5. **Error Handling**: معالجة الأخطاء عندما يكون DM مغلق عند بعض الأعضاء
6. **Confirmation**: رسالة تأكيد توضح عدد الرسائل المرسلة بنجاح والفاشلة

## Project Architecture
### Technology Stack
- **Runtime**: Node.js 20
- **Library**: Discord.js v14
- **Authentication**: Discord Bot Token (stored in Replit Secrets)

### File Structure
```
├── index.js          # Main bot file
├── package.json      # Dependencies and scripts
└── .gitignore        # Git ignore rules
```

### Key Components
1. **Bot Client**: يتصل بديسكورد باستخدام Bot Token
2. **Slash Command Registration**: تسجيل الأمر تلقائياً عند تشغيل البوت
3. **Modal Handler**: معالج للنموذج الذي يظهر عند كتابة الأمر
4. **DM Sender**: حلقة ترسل الرسالة لكل عضو مع تأخير ثانية واحدة بين كل رسالة

## Recent Changes
- **2025-10-19**: إنشاء المشروع الأولي
  - إعداد بيئة Node.js
  - تثبيت discord.js
  - إنشاء البوت مع أمر /send_to_all
  - إضافة Modal interface مع حقل reason
  - تطبيق منطق إرسال DM لجميع الأعضاء
  - إضافة منشن المستخدم في نهاية الرسالة
  - معالجة الأخطاء ورسائل التأكيد

## User Preferences
- اللغة العربية للواجهات والرسائل
- رسالة خاصة (DM) لكل عضو بدلاً من منشن جماعي
- منشن المستخدم في آخر الرسالة
- حقل واحد فقط في النموذج (reason)

## Required Setup
1. **Discord Bot Token**: يجب الحصول عليه من Discord Developer Portal
2. **Bot Permissions**: 
   - Send Messages
   - Send Messages in Threads
3. **Bot Intents** (في Developer Portal):
   - SERVER MEMBERS INTENT (مطلوب)
   - MESSAGE CONTENT INTENT (مطلوب)

## How to Use
1. ادعو البوت لسيرفرك
2. اكتب الأمر `/send_to_all` في أي قناة
3. املأ حقل "reason" بالرسالة المطلوبة
4. اضغط Submit
5. سيتم إرسال الرسالة لجميع الأعضاء مع منشن لهم في النهاية

## Limitations
- البوت لا يرسل رسائل للبوتات الأخرى
- قد تفشل بعض الرسائل إذا كان العضو أغلق الرسائل الخاصة
- هناك تأخير ثانية واحدة بين كل رسالة لتجنب Rate Limiting
