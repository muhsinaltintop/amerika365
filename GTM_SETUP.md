# Google Tag Manager Kurulum Notları

GTM container ayarları kod tarafından otomatik yapılamaz; aşağıdaki adımlar Google Tag Manager arayüzünde manuel tamamlanmalıdır.

1. Google Tag Manager'da Amerika365 için bir web container oluşturun.
2. Uygulama ortamına `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` değerini ekleyin.
3. GTM içinde Google tag veya GA4 etiketi oluşturun.
4. GA4 Measurement ID değerini doğrudan uygulama koduna değil, GTM etiketine girin.
5. Google Ads kullanılacaksa Conversion Linker ve dönüşüm etiketlerini GTM içinde ekleyin.
6. GTM Consent Overview özelliğini açın.
7. Google etiketlerinin built-in consent checks kullandığını doğrulayın.
8. Custom HTML veya üçüncü taraf etiketleri varsa gerekli additional consent checks tanımlayın.
9. Analytics etiketlerinin `analytics_storage` izni gerektirdiğini doğrulayın.
10. Reklam etiketleri için `ad_storage`, `ad_user_data` ve `ad_personalization` izinlerini gerektirilecek şekilde ayarlayın.
11. Preview ve Tag Assistant ile varsayılan denied durumunu, kabul sonrası granted durumunu ve reddetme sonrası denied durumunu test edin.
12. Container'ı yalnızca testler başarılı olduktan sonra publish edin.

Not: Bu kod Basic Consent Mode yaklaşımıyla GTM'yi kullanıcı Analytics veya reklam izni vermeden yüklemez. GTM içindeki etiketlerin de consent kontrolleri doğru yapılandırılmalıdır.
