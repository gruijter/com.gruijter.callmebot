# CallMeBot

Have Homey send messages to your own preferred messenger service. You can add multiple services and numbers for everyone in your family. It supports Whatsapp, Signal, Telegram and Facebook messenger.
You need to get a personal APIkey before using the API. Keep this key secret so only you can send messages to yourself!

## WhatsApp
Follow the activation steps on https://www.callmebot.com/blog/free-api-whatsapp-messages/
1) Add the CallMeBot WhatsApp number shown on that page to your Phone Contacts.
2) Send this message "I allow callmebot to send me messages" to the new Contact (using WhatsApp).
3) The bot will answer you with your personal apikey.

Add the WhatsApp device in Homey and fill in your phone number including the country code (e.g. +31 6 12345678) and the apikey. You can now start sending messages from a flow.

If sending fails with "Your Account is Paused", send the word "resume" to the CallMeBot WhatsApp contact.

## Signal
Follow the activation steps on https://www.callmebot.com/blog/free-api-signal-send-messages/
1) Add the CallMeBot Signal number shown on that page to your Phone Contacts.
2) Send this message "I allow callmebot to send me messages" to the new Contact (using Signal).
3) The bot will answer you with your personal apikey.

Add the Signal device in Homey and fill in your phone number including the country code (e.g. +31 6 12345678) and the apikey. If the bot cannot see your phone number because of your Signal privacy settings, it gives you a UUID instead; use that UUID in place of the phone number. You can now start sending messages from a flow.

## Facebook messenger
1) Start a Facebook Messenger conversation with @api.callmebot. Or click here: https://m.me/api.callmebot
2) Send this message "create apikey" to @api.callmebot (using your Facebook Messenger of course)
3) The bot will answer you with your personal apikey.

Add the Facebook device in Homey and fill in your apikey. The username field required during setup is not used for Facebook and can be filled with any text. You can now start sending messages from a flow.

## Telegram
1) Use your Telegram to send /start to @CallMeBot_txtbot. Or click here: https://api2.callmebot.com/txt/login.php

Add the Telegram device in Homey and fill in your user name (e.g. @myusername or +331234567890). The apikey field required during setup is not used for personal messages and can be left empty or filled with any text. You can now start sending messages from a flow.

## Telegram group messages
1) Authorize CallMeBot as described under Telegram above.
2) Add @API_CallMeBot to your Telegram group and get the group apikey as described on https://www.callmebot.com/blog/telegram-group-messages-api-easy/

Enter that apikey in the Telegram device, and use the "Send a group message" flow card.

## Send Voice Messages
With Telegram you can start a voice call from a flow. The text (max. 256 characters) will be converted to speech in a selection of languages. You can choose between a male and a female voice. The one time Telegram authorization above (/start to @CallMeBot_txtbot) also allows CallMeBot to call you.

## Send Images
With Signal and FB messenger you can send images via a flow.

### Data privacy and terms of use
https://www.callmebot.com/terms-of-service/

### Donate
https://www.paypal.com/paypalme/gruijter