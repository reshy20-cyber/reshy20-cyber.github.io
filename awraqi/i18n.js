/* أوراقي — نظام اللغات: العربية (الأصل) + English + Français + Deutsch + Türkçe + Español.
   المفتاح هو النص العربي نفسه؛ إن لم توجد ترجمة يظهر النص العربي. */
(function(){
'use strict';
var LANGS={
  ar:{n:'العربية',dir:'rtl',loc:'ar'},
  en:{n:'English',dir:'ltr',loc:'en-GB'},
  fr:{n:'Français',dir:'ltr',loc:'fr-FR'},
  de:{n:'Deutsch',dir:'ltr',loc:'de-DE'},
  tr:{n:'Türkçe',dir:'ltr',loc:'tr-TR'},
  es:{n:'Español',dir:'ltr',loc:'es-ES'}
};
var cur='ar';

/* [عربي, English, Français, Deutsch] */
var ROWS=[
['أوراقي','My Papers','Mes Papiers','Meine Papiere'],
['أوراقي — إدارة وتجديد أوراقك وأوراق عائلتك','Awraqi — track and renew your family’s documents','Awraqi — gérez et renouvelez les documents de votre famille','Awraqi — Dokumente Ihrer Familie verwalten und erneuern'],
['أوراقي: سجّل تواريخ انتهاء الجوازات والإقامات والرخص لك ولعائلتك، ونبّهك قبل الانتهاء مع قائمة المستندات المطلوبة للتجديد.','Awraqi: record the expiry dates of passports, residence permits and licences for you and your family, and get reminded before they expire, with the list of documents needed to renew.','Awraqi : enregistrez les dates d’expiration des passeports, titres de séjour et permis de votre famille, et soyez averti avant l’échéance, avec la liste des pièces à fournir pour le renouvellement.','Awraqi: Erfassen Sie die Ablaufdaten von Pässen, Aufenthaltstiteln und Führerscheinen für sich und Ihre Familie und werden Sie rechtzeitig erinnert – mit der Liste der Unterlagen für die Verlängerung.'],
['إدارة وتجديد جميع أوراقك وأوراق عائلتك','Manage and renew all your family’s documents','Gérez et renouvelez tous les documents de votre famille','Alle Dokumente Ihrer Familie verwalten und erneuern'],
['أوراقي — إدارة وتجديد جميع أوراقك وأوراق عائلتك','Awraqi — manage and renew all your family’s documents','Awraqi — gérez et renouvelez tous les documents de votre famille','Awraqi — alle Dokumente Ihrer Familie verwalten und erneuern'],
['تخطّي','Skip','Passer','Überspringen'],
['التالي','Next','Suivant','Weiter'],
['ابدأ الآن','Get started','Commencer','Los geht’s'],
['التنبيهات','Notifications','Notifications','Benachrichtigungen'],
['الإعدادات','Settings','Paramètres','Einstellungen'],
['رجوع','Back','Retour','Zurück'],
['الدولة','Country','Pays','Land'],
['التنقل الرئيسي','Main navigation','Navigation principale','Hauptnavigation'],
['عرض الكل','View all','Tout afficher','Alle anzeigen'],
['كل الأوراق','All documents','Tous les documents','Alle Dokumente'],
['أفراد العائلة','Family members','Membres de la famille','Familienmitglieder'],
['إضافة فرد جديد','Add a family member','Ajouter un membre','Mitglied hinzufügen'],
['إضافة ورقة جديدة','Add a new document','Ajouter un document','Neues Dokument hinzufügen'],
['نوع الورقة','Document type','Type de document','Dokumenttyp'],
['لمن هذه الورقة؟','Whose document is it?','À qui appartient ce document ?','Wessen Dokument ist das?'],
['الدولة التي أصدرت الورقة','Issuing country','Pays émetteur','Ausstellungsland'],
['اسم مخصّص (اختياري)','Custom name (optional)','Nom personnalisé (facultatif)','Eigener Name (optional)'],
['مثال: جواز سفر بريطاني','e.g. British passport','ex. : passeport britannique','z. B. Britischer Reisepass'],
['تاريخ الانتهاء','Expiry date','Date d’expiration','Ablaufdatum'],
['لا أعرف التاريخ؟','Don’t know the date?','Vous ne connaissez pas la date ?','Datum nicht bekannt?'],
['ستجده مطبوعًا على الورقة نفسها قرب كلمة «تاريخ الانتهاء» أو Expiry أو Date of expiry. في الجواز يكون في صفحة البيانات.','You’ll find it printed on the document itself, next to “Expiry” or “Date of expiry”. In a passport it is on the data page.','Elle est imprimée sur le document, près de « Date d’expiration » ou « Date of expiry ». Sur un passeport, elle figure sur la page des données.','Es steht auf dem Dokument selbst, neben „Ablaufdatum“ oder „Date of expiry“. Im Reisepass finden Sie es auf der Datenseite.'],
['حفظ الورقة','Save document','Enregistrer le document','Dokument speichern'],
['تفاصيل الورقة','Document details','Détails du document','Dokumentdetails'],
['متطلبات التجديد','Renewal requirements','Conditions de renouvellement','Anforderungen zur Verlängerung'],
['حسب الدولة','By country','Par pays','Nach Land'],
['اختر الدولة التي أصدرت الورقة لترى قوائم التجديد الموثّقة من مصادرها الرسمية.','Choose the issuing country to see renewal lists checked against their official sources.','Choisissez le pays émetteur pour voir les listes de renouvellement vérifiées auprès des sources officielles.','Wählen Sie das Ausstellungsland, um die anhand offizieller Quellen geprüften Verlängerungslisten zu sehen.'],
['نضيف بقية الدول العربية تباعًا بعد التحقق من المصادر الرسمية.','We are adding the remaining Arab countries as their official sources are verified.','Nous ajoutons les autres pays arabes au fur et à mesure de la vérification des sources officielles.','Weitere arabische Länder folgen, sobald ihre offiziellen Quellen geprüft sind.'],
['الإشعارات','Notifications','Notifications','Benachrichtigungen'],
['للتنبيه على هاتفك قبل الانتهاء بـ 90 و30 و7 أيام، افتح الورقة واضغط «أضف للتقويم».','To be reminded on your phone 90, 30 and 7 days before expiry, open the document and tap “Add to calendar”.','Pour être averti sur votre téléphone 90, 30 et 7 jours avant l’échéance, ouvrez le document et touchez « Ajouter au calendrier ».','Für Erinnerungen auf dem Handy 90, 30 und 7 Tage vor Ablauf öffnen Sie das Dokument und tippen auf „Zum Kalender hinzufügen“.'],
['التقارير والإحصائيات','Reports and statistics','Rapports et statistiques','Berichte und Statistiken'],
['👨‍👩‍👧 أفراد العائلة','👨‍👩‍👧 Family members','👨‍👩‍👧 Membres de la famille','👨‍👩‍👧 Familienmitglieder'],
['💾 حفظ نسخة احتياطية','💾 Back up my data','💾 Sauvegarder mes données','💾 Datensicherung erstellen'],
['📅 أضف كل المستندات للتقويم','📅 Add all documents to calendar','📅 Ajouter tous les documents au calendrier','📅 Alle Dokumente zum Kalender hinzufügen'],
['تذكيرات على هاتفك قبل الانتهاء','Reminders on your phone before expiry','Rappels sur votre téléphone avant l’expiration','Erinnerungen auf Ihrem Handy vor Ablauf'],
['أضف ورقة أولًا','Add a document first','Ajoutez d’abord un document','Fügen Sie zuerst ein Dokument hinzu'],
['اختر «إضافة إلى التقويم» من قائمة المشاركة','Choose “Add to Calendar” in the share menu','Choisissez « Ajouter au calendrier » dans le menu de partage','Wählen Sie im Teilen-Menü „Zum Kalender hinzufügen“'],
['ملف على جهازك','A file on your device','Un fichier sur votre appareil','Eine Datei auf Ihrem Gerät'],
['📥 استرجاع نسخة احتياطية','📥 Restore a backup','📥 Restaurer une sauvegarde','📥 Sicherung wiederherstellen'],
['🔒 الخصوصية','🔒 Privacy','🔒 Confidentialité','🔒 Datenschutz'],
['✉️ تواصل معنا','✉️ Contact us','✉️ Nous contacter','✉️ Kontakt'],
['🌐 اللغة','🌐 Language','🌐 Langue','🌐 Sprache'],
['اللغة','Language','Langue','Sprache'],
['حذف كل بياناتي','Delete all my data','Supprimer toutes mes données','Alle meine Daten löschen'],
['أوراقي بلا حدود','Awraqi Unlimited','Awraqi illimité','Awraqi unbegrenzt'],
['أوراق غير محدودة بدل 3 أوراق','Unlimited documents instead of 3','Documents illimités au lieu de 3','Unbegrenzt viele Dokumente statt 3'],
['دفعة واحدة، بلا اشتراك شهري','One-time payment, no monthly subscription','Paiement unique, sans abonnement mensuel','Einmalzahlung, kein Monatsabo'],
['بياناتك تبقى على جهازك','Your data stays on your device','Vos données restent sur votre appareil','Ihre Daten bleiben auf Ihrem Gerät'],
['دفعة واحدة','One-time payment','Paiement unique','Einmalzahlung'],
['تُدفع مرة واحدة وتبقى لك','Pay once and keep it','Payez une fois, c’est à vous','Einmal zahlen und behalten'],
['فتح أوراقي بلا حدود','Unlock Awraqi Unlimited','Débloquer Awraqi illimité','Awraqi unbegrenzt freischalten'],
['متابعة مجانًا (3 أوراق)','Continue free (3 documents)','Continuer gratuitement (3 documents)','Kostenlos fortfahren (3 Dokumente)'],
['إضافة فرد من العائلة','Add a family member','Ajouter un membre de la famille','Familienmitglied hinzufügen'],
['الاسم','Name','Nom','Name'],
['حفظ','Save','Enregistrer','Speichern'],
['إلغاء','Cancel','Annuler','Abbrechen'],
['‹','›','›','›'],

/* الأنواع */
['جواز السفر','Passport','Passeport','Reisepass'],
['الإقامة','Residence permit','Titre de séjour','Aufenthaltstitel'],
['التأشيرة','Visa','Visa','Visum'],
['رخصة القيادة','Driving licence','Permis de conduire','Führerschein'],
['البطاقة الشخصية','ID card','Carte d’identité','Personalausweis'],
['التأمين','Insurance','Assurance','Versicherung'],
['بطاقة بنكية','Bank card','Carte bancaire','Bankkarte'],
['ورقة أخرى','Other document','Autre document','Sonstiges Dokument'],
['أخرى','Other','Autre','Sonstiges'],

/* قوائم عامة */
['الجواز القديم','Your old passport','Ancien passeport','Alter Reisepass'],
['صور شخصية بمواصفات الجهة المصدِرة','Photos that meet the issuing authority’s specifications','Photos conformes aux exigences de l’autorité émettrice','Fotos nach den Vorgaben der ausstellenden Behörde'],
['الهوية الوطنية أو الإقامة السارية','National ID or valid residence permit','Pièce d’identité nationale ou titre de séjour valide','Nationaler Ausweis oder gültiger Aufenthaltstitel'],
['إيصال الرسوم','Fee receipt','Reçu de paiement des frais','Gebührenquittung'],
['حجز موعد أو تقديم الطلب عبر الموقع الرسمي أو القنصلية','Book an appointment or apply through the official website or consulate','Prendre rendez-vous ou déposer la demande via le site officiel ou le consulat','Termin buchen oder Antrag über die offizielle Website bzw. das Konsulat stellen'],
['جواز سفر ساري المفعول (غالبًا لا يقل عن 6 أشهر)','Valid passport (often at least 6 months’ validity)','Passeport valide (souvent au moins 6 mois de validité)','Gültiger Reisepass (oft mindestens 6 Monate Restgültigkeit)'],
['الإقامة الحالية','Your current residence permit','Titre de séjour actuel','Aktueller Aufenthaltstitel'],
['عقد العمل أو إثبات سكن/دراسة حسب نوع الإقامة','Employment contract or proof of housing/study, depending on the permit type','Contrat de travail ou justificatif de logement/d’études selon le type de titre','Arbeitsvertrag oder Wohn-/Studiennachweis je nach Art des Titels'],
['تأمين صحي إن كان مطلوبًا','Health insurance, if required','Assurance maladie, si exigée','Krankenversicherung, falls erforderlich'],
['صور شخصية','Passport-style photos','Photos d’identité','Passfotos'],
['جواز ساري المفعول','Valid passport','Passeport valide','Gültiger Reisepass'],
['حجز سفر وإقامة','Travel and accommodation bookings','Réservations de voyage et d’hébergement','Reise- und Unterkunftsbuchungen'],
['إثبات تمويل أو كشف حساب','Proof of funds or a bank statement','Justificatif de ressources ou relevé bancaire','Finanzierungsnachweis oder Kontoauszug'],
['تأمين سفر إن كان مطلوبًا','Travel insurance, if required','Assurance voyage, si exigée','Reiseversicherung, falls erforderlich'],
['طلب التأشيرة وصور شخصية','Visa application form and photos','Formulaire de demande de visa et photos','Visumantrag und Fotos'],
['الرخصة الحالية','Your current licence','Permis actuel','Aktueller Führerschein'],
['الهوية أو الإقامة','ID or residence permit','Pièce d’identité ou titre de séjour','Ausweis oder Aufenthaltstitel'],
['فحص طبي/نظر إن كان مطلوبًا','Medical or eye test, if required','Examen médical ou de la vue, si exigé','Ärztliche Untersuchung oder Sehtest, falls erforderlich'],
['البطاقة القديمة','Your old card','Ancienne carte','Alte Karte'],
['مستند إثبات العنوان إن كان مطلوبًا','Proof of address, if required','Justificatif de domicile, si exigé','Adressnachweis, falls erforderlich'],
['وثيقة التأمين الحالية','Your current insurance policy','Police d’assurance actuelle','Aktuelle Versicherungspolice'],
['بيانات المركبة أو المؤمَّن عليه','Details of the vehicle or insured person','Informations sur le véhicule ou l’assuré','Angaben zum Fahrzeug oder zur versicherten Person'],
['مقارنة عروض قبل التجديد','Compare offers before renewing','Comparer les offres avant de renouveler','Angebote vor der Verlängerung vergleichen'],
['سداد القسط','Pay the premium','Régler la prime','Prämie bezahlen'],
['اتصل بالبنك أو افتح تطبيقه قبل الانتهاء','Contact your bank or open its app before the card expires','Contactez votre banque ou ouvrez son application avant l’expiration','Kontaktieren Sie Ihre Bank oder öffnen Sie deren App vor Ablauf'],
['تأكد من العنوان لاستلام البطاقة الجديدة','Check your address so the new card reaches you','Vérifiez votre adresse pour recevoir la nouvelle carte','Prüfen Sie Ihre Adresse, damit die neue Karte ankommt'],
['حدّث البطاقة في الخدمات المرتبطة بها','Update the card in any services linked to it','Mettez à jour la carte dans les services associés','Aktualisieren Sie die Karte in verknüpften Diensten'],
['راجع الجهة المصدِرة لمعرفة المستندات المطلوبة','Check with the issuing authority for the documents required','Renseignez-vous auprès de l’autorité émettrice sur les pièces requises','Fragen Sie die ausstellende Behörde nach den erforderlichen Unterlagen'],
['جهّز نسخة من الورقة الحالية','Prepare a copy of the current document','Préparez une copie du document actuel','Halten Sie eine Kopie des aktuellen Dokuments bereit'],
['احجز موعدًا إن كان مطلوبًا','Book an appointment, if required','Prenez rendez-vous si nécessaire','Termin buchen, falls erforderlich'],

/* العلاقات */
['أنا','Me','Moi','Ich'],
['زوجتي','My wife','Ma femme','Meine Frau'],
['زوجي','My husband','Mon mari','Mein Mann'],
['ابني','My son','Mon fils','Mein Sohn'],
['ابنتي','My daughter','Ma fille','Meine Tochter'],
['أبي','My father','Mon père','Mein Vater'],
['أمي','My mother','Ma mère','Meine Mutter'],
['أخي','My brother','Mon frère','Mein Bruder'],
['أختي','My sister','Ma sœur','Meine Schwester'],
['آخر','Other','Autre','Andere'],
['الزوجة','Wife','Épouse','Ehefrau'],
['الزوج','Husband','Époux','Ehemann'],
['الابن','Son','Fils','Sohn'],
['الابنة','Daughter','Fille','Tochter'],
['الأب','Father','Père','Vater'],
['الأم','Mother','Mère','Mutter'],
['الأخ','Brother','Frère','Bruder'],
['الأخت','Sister','Sœur','Schwester'],
['فرد آخر','Other member','Autre membre','Weiteres Mitglied'],

/* الحالات */
['عاجلة','Urgent','Urgent','Dringend'],
['قريبة','Soon','Bientôt','Bald'],
['سارية','Valid','Valide','Gültig'],
['تنبيه عاجل','Urgent reminder','Rappel urgent','Dringende Erinnerung'],
['تنبيه قريب','Upcoming reminder','Rappel proche','Anstehende Erinnerung'],
['تنبيه مبكر','Early reminder','Rappel anticipé','Frühe Erinnerung'],

/* التعريف */
['كل أوراق عائلتك في مكان واحد','All your family’s documents in one place','Tous les documents de votre famille au même endroit','Alle Dokumente Ihrer Familie an einem Ort'],
['أضف جوازاتك وإقاماتك ورخصك وأوراق أفراد عائلتك، وشاهد الأقرب انتهاءً أولًا.','Add your passports, residence permits, licences and your family’s documents, and see the ones expiring soonest first.','Ajoutez vos passeports, titres de séjour, permis et les documents de votre famille, et voyez en premier ceux qui expirent bientôt.','Fügen Sie Pässe, Aufenthaltstitel, Führerscheine und die Dokumente Ihrer Familie hinzu – die am frühesten ablaufenden stehen oben.'],
['تنبيه قبل أن تنتهي','A reminder before they expire','Un rappel avant l’expiration','Eine Erinnerung vor dem Ablauf'],
['أضف الورقة إلى تقويم هاتفك بضغطة واحدة، فيذكّرك قبل الانتهاء بـ 90 و30 و7 أيام.','Add a document to your phone’s calendar in one tap and get reminded 90, 30 and 7 days before it expires.','Ajoutez un document à l’agenda de votre téléphone d’un seul geste et soyez averti 90, 30 et 7 jours avant l’échéance.','Fügen Sie ein Dokument mit einem Tipp zum Handy-Kalender hinzu – Sie werden 90, 30 und 7 Tage vor Ablauf erinnert.'],
['وماذا أحتاج للتجديد؟','What do I need to renew?','De quoi ai-je besoin pour renouveler ?','Was brauche ich für die Verlängerung?'],
['نعرض قائمة المستندات من الصفحة الرسمية للدولة المُصدِرة، مع رابطها وتاريخ آخر تحقق. وإن لم نوثّقها بعد نخبرك صراحةً.','We show the list of documents from the issuing country’s official page, with its link and the date we last checked it. If we haven’t verified a list yet, we say so clearly.','Nous affichons la liste des pièces d’après la page officielle du pays émetteur, avec son lien et la date de dernière vérification. Si une liste n’est pas encore vérifiée, nous vous le disons clairement.','Wir zeigen die Unterlagenliste von der offiziellen Seite des Ausstellungslands, mit Link und Datum der letzten Prüfung. Ist eine Liste noch nicht geprüft, sagen wir das deutlich.'],

/* الشاشات */
['لا أوراق بعد','No documents yet','Aucun document pour l’instant','Noch keine Dokumente'],
['اضغط «إضافة ورقة» وسجّل أول جواز أو إقامة، وسنعرض لك المتبقي ونذكّرك قبل الانتهاء.','Tap “Add document” and record your first passport or residence permit. We’ll show the time left and remind you before it expires.','Touchez « Ajouter un document » et enregistrez votre premier passeport ou titre de séjour. Nous afficherons le temps restant et vous préviendrons avant l’échéance.','Tippen Sie auf „Dokument hinzufügen“ und erfassen Sie Ihren ersten Pass oder Aufenthaltstitel. Wir zeigen die Restzeit und erinnern Sie rechtzeitig.'],
['الأوراق الأقرب انتهاءً','Expiring soonest','Expirent bientôt','Läuft bald ab'],
['أفراد<br>العائلة','Family<br>members','Membres<br>de la famille','Familien-<br>mitglieder'],
['التقارير','Reports','Rapports','Berichte'],
['حسب<br>الدولة','By<br>country','Par<br>pays','Nach<br>Land'],
['متطلبات<br>التجديد','Renewal<br>requirements','Conditions de<br>renouvellement','Anforderungen<br>Verlängerung'],
['وصلت إلى حد النسخة المجانية ({n} أوراق).','You’ve reached the free version’s limit ({n} documents).','Vous avez atteint la limite de la version gratuite ({n} documents).','Sie haben das Limit der kostenlosen Version erreicht ({n} Dokumente).'],
['فتح أوراق غير محدودة','Unlock unlimited documents','Débloquer les documents illimités','Unbegrenzte Dokumente freischalten'],
['الكل','All','Tous','Alle'],
['لا أوراق هنا','No documents here','Aucun document ici','Hier sind keine Dokumente'],
['أضف ورقة من زر «إضافة ورقة».','Add one with the “Add document” button.','Ajoutez-en un avec le bouton « Ajouter un document ».','Fügen Sie eines über „Dokument hinzufügen“ hinzu.'],
['تنتهي في: {d}','Expires: {d}','Expire le : {d}','Läuft ab am: {d}'],
['تعديل الاسم','Edit name','Modifier le nom','Namen bearbeiten'],
['حذف الفرد','Remove member','Supprimer le membre','Mitglied entfernen'],
['خيارات','Options','Options','Optionen'],
['تعديل الفرد','Edit member','Modifier le membre','Mitglied bearbeiten'],
['اكتب الاسم','Enter a name','Saisissez un nom','Name eingeben'],
['حذف هذا الفرد وأوراقه ({c})؟','Remove this member and their documents ({c})?','Supprimer ce membre et ses documents ({c}) ?','Dieses Mitglied und seine Dokumente ({c}) entfernen?'],
['حذف هذا الفرد؟','Remove this member?','Supprimer ce membre ?','Dieses Mitglied entfernen?'],
['الرئيسية','Home','Accueil','Start'],
['العائلة','Family','Famille','Familie'],
['إضافة ورقة','Add document','Ajouter un document','Dokument hinzufügen'],
['المتطلبات','Requirements','Conditions','Erneuern'],
['وصلت إلى حد النسخة المجانية','You’ve reached the free version’s limit','Vous avez atteint la limite de la version gratuite','Limit der kostenlosen Version erreicht'],
['تم التجديد؟','Renewed?','Renouvelé ?','Verlängert?'],
['تعديل الورقة','Edit document','Modifier le document','Dokument bearbeiten'],
['تاريخ الانتهاء الجديد','New expiry date','Nouvelle date d’expiration','Neues Ablaufdatum'],
['اختر تاريخ الانتهاء','Choose the expiry date','Choisissez la date d’expiration','Ablaufdatum wählen'],
['تم تحديث التاريخ','Date updated','Date mise à jour','Datum aktualisiert'],
['تم حفظ الورقة','Document saved','Document enregistré','Dokument gespeichert'],
['حذف هذه الورقة؟','Delete this document?','Supprimer ce document ?','Dieses Dokument löschen?'],
['تم الحذف','Deleted','Supprimé','Gelöscht'],
['مواعيد التنبيه','Reminder schedule','Calendrier des rappels','Erinnerungstermine'],
['قبل 90 يومًا، 30 يومًا، 7 أيام','90 days, 30 days and 7 days before','90 jours, 30 jours et 7 jours avant','90, 30 und 7 Tage vorher'],
['الدولة المُصدِرة','Issuing country','Pays émetteur','Ausstellungsland'],
['تجديد في دولة أخرى','Renew in another country','Renouveler dans un autre pays','In einem anderen Land verlängern'],
['تعديل البيانات','Edit details','Modifier les informations','Angaben bearbeiten'],
['تم التجديد','Renewed','Renouvelé','Verlängert'],
['أضف للتقويم','Add to calendar','Ajouter au calendrier','Zum Kalender hinzufügen'],
['حذف الورقة','Delete document','Supprimer le document','Dokument löschen'],
['🔒 نحفظ اسم الورقة وتاريخ انتهائها على جهازك فقط. لا صور ولا أرقام مستندات.','🔒 We store the document name and expiry date on your device only. No photos, no document numbers.','🔒 Nous ne conservons que le nom du document et sa date d’expiration, sur votre appareil. Aucune photo, aucun numéro de document.','🔒 Wir speichern nur Dokumentname und Ablaufdatum auf Ihrem Gerät. Keine Fotos, keine Dokumentennummern.'],
['المستندات المطلوبة','Required documents','Pièces requises','Erforderliche Unterlagen'],
['آخر تحقق من المصدر الرسمي: {d}','Last checked against the official source: {d}','Dernière vérification auprès de la source officielle : {d}','Zuletzt mit der offiziellen Quelle abgeglichen: {d}'],
['عرض الموقع الرسمي','Open the official website','Ouvrir le site officiel','Offizielle Website öffnen'],
['⚑ أبلغ عن خطأ في هذه القائمة','⚑ Report an error in this list','⚑ Signaler une erreur dans cette liste','⚑ Fehler in dieser Liste melden'],
['خطأ في قائمة التجديد','Renewal list error','Erreur dans la liste de renouvellement','Fehler in der Verlängerungsliste'],
['تجديد {t} — {c}','{t} renewal — {c}','Renouvellement : {t} — {c}','Verlängerung: {t} — {c}'],
['لم نوثّق هذه القائمة بعد','We haven’t verified this list yet','Cette liste n’est pas encore vérifiée','Diese Liste ist noch nicht geprüft'],
['القائمة أدناه عامة وإرشادية فقط. راجع الجهة الرسمية قبل الاعتماد عليها.','The list below is general guidance only. Check with the official authority before relying on it.','La liste ci-dessous est indicative seulement. Vérifiez auprès de l’autorité officielle avant de vous y fier.','Die folgende Liste ist nur eine allgemeine Orientierung. Prüfen Sie sie bei der zuständigen Behörde, bevor Sie sich darauf verlassen.'],
['الموقع الرسمي للدولة','The country’s official website','Site officiel du pays','Offizielle Website des Landes'],
['ابدأ التجديد قبل الانتهاء بوقت كافٍ، فالمتطلبات والرسوم تتغير. التطبيق لا يغني عن الجهة الرسمية.','Start renewing well before expiry — requirements and fees change. The app does not replace the official authority.','Commencez le renouvellement bien avant l’échéance : les conditions et les frais changent. L’application ne remplace pas l’autorité officielle.','Beginnen Sie die Verlängerung rechtzeitig vor Ablauf – Anforderungen und Gebühren ändern sich. Die App ersetzt nicht die offizielle Behörde.'],
['هذه القائمة معروضة بالعربية كما وردت من المصدر، وترجمتها قيد الإعداد.','This list is shown in Arabic, as published by the official source. A translation is on the way.','Cette liste est affichée en arabe, telle que publiée par la source officielle. La traduction est en préparation.','Diese Liste wird auf Arabisch angezeigt, wie von der offiziellen Quelle veröffentlicht. Eine Übersetzung folgt.'],
['{n} قوائم موثّقة','{n} verified lists','{n} listes vérifiées','{n} geprüfte Listen'],
['تاريخ الانتهاء: {d}','Expiry date: {d}','Date d’expiration : {d}','Ablaufdatum: {d}'],
['لا شيء عاجل','Nothing urgent','Rien d’urgent','Nichts Dringendes'],
['لا توجد أوراق تنتهي خلال الأشهر الأربعة القادمة.','No documents expire within the next four months.','Aucun document n’expire dans les quatre prochains mois.','In den nächsten vier Monaten läuft kein Dokument ab.'],
['ورقة','in total','au total','gesamt'],
['تنبيهات قادمة','Upcoming reminders','Rappels à venir','Anstehende Erinnerungen'],
['حسب الفرد','By member','Par membre','Nach Mitglied'],
['لا بيانات بعد','No data yet','Pas encore de données','Noch keine Daten'],
['أضف أوراقك لتظهر الإحصائيات هنا.','Add your documents and the statistics will appear here.','Ajoutez vos documents et les statistiques apparaîtront ici.','Fügen Sie Dokumente hinzu, dann erscheinen hier die Statistiken.'],
['⭐ أوراقي بلا حدود مفعّل','⭐ Awraqi Unlimited is active','⭐ Awraqi illimité est activé','⭐ Awraqi unbegrenzt ist aktiv'],
['⭐ فتح أوراقي بلا حدود','⭐ Unlock Awraqi Unlimited','⭐ Débloquer Awraqi illimité','⭐ Awraqi unbegrenzt freischalten'],
['تم حفظ النسخة على جهازك','Backup saved to your device','Sauvegarde enregistrée sur votre appareil','Sicherung auf Ihrem Gerät gespeichert'],
['سيُستبدل ما في التطبيق الآن بمحتوى النسخة ({n} ورقة). متابعة؟','What’s in the app now will be replaced by the backup ({n} documents). Continue?','Le contenu actuel de l’application sera remplacé par la sauvegarde ({n} documents). Continuer ?','Der aktuelle Inhalt der App wird durch die Sicherung ersetzt ({n} Dokumente). Fortfahren?'],
['تم الاسترجاع','Restored','Restauré','Wiederhergestellt'],
['الملف غير صالح','Invalid file','Fichier non valide','Ungültige Datei'],
['سيُحذف كل شيء من هذا الجهاز. متابعة؟','Everything will be deleted from this device. Continue?','Tout sera supprimé de cet appareil. Continuer ?','Alles wird von diesem Gerät gelöscht. Fortfahren?'],
['تنتهي: {t}','Expires: {t}','Expire : {t}','Läuft ab: {t}'],
['افتح الملف لإضافته إلى تقويم هاتفك','Open the file to add it to your phone’s calendar','Ouvrez le fichier pour l’ajouter à l’agenda de votre téléphone','Öffnen Sie die Datei, um sie dem Handy-Kalender hinzuzufügen'],
['الترقية متاحة من داخل تطبيق Google Play فقط','Upgrading is available only inside the Google Play app','La mise à niveau n’est disponible que dans l’application Google Play','Das Upgrade ist nur in der Google-Play-App verfügbar'],
['تعذّر التحقق من الشراء. تواصل معنا إن خُصم المبلغ.','We couldn’t verify the purchase. Contact us if you were charged.','Impossible de vérifier l’achat. Contactez-nous si vous avez été débité.','Der Kauf konnte nicht überprüft werden. Kontaktieren Sie uns, falls Sie belastet wurden.'],
['🎉 تمت الترقية! شكرًا لك','🎉 Upgraded! Thank you','🎉 Mise à niveau effectuée ! Merci','🎉 Upgrade abgeschlossen! Vielen Dank'],
['تعذّر إتمام الشراء. لم يُخصم شيء.','The purchase couldn’t be completed. You haven’t been charged.','L’achat n’a pas pu aboutir. Vous n’avez pas été débité.','Der Kauf konnte nicht abgeschlossen werden. Es wurde nichts abgebucht.'],
['للإبلاغ عن خطأ','Report an error','Signaler une erreur','Fehler melden'],
['أنا ({x})','Me ({x})','Moi ({x})','Ich ({x})'],
['{n} تحتاج انتباهك','{n} need attention','{n} à surveiller','{n} brauchen Aufmerksamkeit'],
['فقط','','','']
];

var D={en:{},fr:{},de:{},tr:{},es:{}};
ROWS.forEach(function(r){D.en[r[0]]=r[1];D.fr[r[0]]=r[2];D.de[r[0]]=r[3]});
var MORE=window.I18N_MORE||{};D.tr=MORE.tr||{};D.es=MORE.es||{};

/* أسماء الدول */
var CN={
 en:{eg:'Egypt',uk:'United Kingdom',sa:'Saudi Arabia',ae:'United Arab Emirates',kw:'Kuwait',jo:'Jordan',qa:'Qatar',bh:'Bahrain',om:'Oman',ma:'Morocco',lb:'Lebanon',tn:'Tunisia',dz:'Algeria',iq:'Iraq',ly:'Libya','in':'India',pk:'Pakistan',tr:'Türkiye',us:'United States',es:'Spain',mx:'Mexico',co:'Colombia',arg:'Argentina',other:'Other country'},
 fr:{eg:'Égypte',uk:'Royaume-Uni',sa:'Arabie saoudite',ae:'Émirats arabes unis',kw:'Koweït',jo:'Jordanie',qa:'Qatar',bh:'Bahreïn',om:'Oman',ma:'Maroc',lb:'Liban',tn:'Tunisie',dz:'Algérie',iq:'Irak',ly:'Libye','in':'Inde',pk:'Pakistan',tr:'Turquie',us:'États-Unis',es:'Espagne',mx:'Mexique',co:'Colombie',arg:'Argentine',other:'Autre pays'},
 de:{eg:'Ägypten',uk:'Vereinigtes Königreich',sa:'Saudi-Arabien',ae:'Vereinigte Arabische Emirate',kw:'Kuwait',jo:'Jordanien',qa:'Katar',bh:'Bahrain',om:'Oman',ma:'Marokko',lb:'Libanon',tn:'Tunesien',dz:'Algerien',iq:'Irak',ly:'Libyen','in':'Indien',pk:'Pakistan',tr:'Türkei',us:'Vereinigte Staaten',es:'Spanien',mx:'Mexiko',co:'Kolumbien',arg:'Argentinien',other:'Anderes Land'},
 tr:{eg:'Mısır',uk:'Birleşik Krallık',sa:'Suudi Arabistan',ae:'Birleşik Arap Emirlikleri',kw:'Kuveyt',jo:'Ürdün',qa:'Katar',bh:'Bahreyn',om:'Umman',ma:'Fas',lb:'Lübnan',tn:'Tunus',dz:'Cezayir',iq:'Irak',ly:'Libya','in':'Hindistan',pk:'Pakistan',tr:'Türkiye',us:'Amerika Birleşik Devletleri',es:'İspanya',mx:'Meksika',co:'Kolombiya',arg:'Arjantin',other:'Diğer ülke'},
 es:{eg:'Egipto',uk:'Reino Unido',sa:'Arabia Saudí',ae:'Emiratos Árabes Unidos',kw:'Kuwait',jo:'Jordania',qa:'Catar',bh:'Baréin',om:'Omán',ma:'Marruecos',lb:'Líbano',tn:'Túnez',dz:'Argelia',iq:'Irak',ly:'Libia','in':'India',pk:'Pakistán',tr:'Turquía',us:'Estados Unidos',es:'España',mx:'México',co:'Colombia',arg:'Argentina',other:'Otro país'}
};

/* الأعداد والجموع */
function pl(n,one,many){return n===1?one:many}
var F={
 ar:{
  papers:function(n){return n===1?'ورقة واحدة':n===2?'ورقتان':n<=10?n+' أوراق':n+' ورقة'},
  dayStr:function(n){return n===1?'يوم واحد':n===2?'يومان':n<=10?n+' أيام':n+' يومًا'},
  dayGen:function(n){return n===1?'يوم':n===2?'يومين':n<=10?n+' أيام':n+' يومًا'},
  label:function(n){if(n<0)return'منتهية منذ '+F.ar.dayGen(-n);if(n===0)return'تنتهي اليوم';if(n<=100)return'متبقٍ '+F.ar.dayStr(n);var mo=Math.round(n/30);return mo<24?'متبقٍ '+mo+' شهرًا':'متبقٍ '+(n/365).toFixed(1)+' سنة'},
  when:function(n,f){var a=f?'تنتهي':'ينتهي';return n<0?(f?'انتهت':'انتهى')+' منذ <em>'+F.ar.dayGen(-n)+'</em>':n===0?a+' <em>اليوم</em>':n===1?a+' <em>غدًا</em>':a+' خلال <em>'+F.ar.dayStr(n)+'</em>'},
  only:' فقط'
 },
 en:{
  papers:function(n){return n+' '+pl(n,'document','documents')},
  dayStr:function(n){return n+' '+pl(n,'day','days')},
  label:function(n){if(n<0)return'Expired '+F.en.dayStr(-n)+' ago';if(n===0)return'Expires today';if(n<=100)return F.en.dayStr(n)+' left';var mo=Math.round(n/30);return mo<24?mo+' months left':(n/365).toFixed(1)+' years left'},
  when:function(n){return n<0?'expired <em>'+F.en.dayStr(-n)+' ago</em>':n===0?'expires <em>today</em>':n===1?'expires <em>tomorrow</em>':'expires in <em>'+F.en.dayStr(n)+'</em>'},
  only:''
 },
 fr:{
  papers:function(n){return n+' '+pl(n,'document','documents')},
  dayStr:function(n){return n+' '+pl(n,'jour','jours')},
  label:function(n){if(n<0)return'Expiré depuis '+F.fr.dayStr(-n);if(n===0)return'Expire aujourd’hui';if(n<=100)return F.fr.dayStr(n)+' '+pl(n,'restant','restants');var mo=Math.round(n/30);return mo<24?mo+' mois restants':(n/365).toFixed(1).replace('.',',')+' ans restants'},
  when:function(n){return n<0?'a expiré il y a <em>'+F.fr.dayStr(-n)+'</em>':n===0?'expire <em>aujourd’hui</em>':n===1?'expire <em>demain</em>':'expire dans <em>'+F.fr.dayStr(n)+'</em>'},
  only:''
 },
 de:{
  papers:function(n){return n+' '+pl(n,'Dokument','Dokumente')},
  dayStr:function(n){return n+' '+pl(n,'Tag','Tage')},
  dayDat:function(n){return n+' '+pl(n,'Tag','Tagen')},
  label:function(n){if(n<0)return'Seit '+F.de.dayDat(-n)+' abgelaufen';if(n===0)return'Läuft heute ab';if(n<=100)return'Noch '+F.de.dayStr(n);var mo=Math.round(n/30);return mo<24?'Noch '+mo+' Monate':'Noch '+(n/365).toFixed(1).replace('.',',')+' Jahre'},
  when:function(n){return n<0?'ist seit <em>'+F.de.dayDat(-n)+'</em> abgelaufen':n===0?'läuft <em>heute</em> ab':n===1?'läuft <em>morgen</em> ab':'läuft in <em>'+F.de.dayDat(n)+'</em> ab'},
  only:''
 }
};
F.tr={
  papers:function(n){return n+' belge'},
  dayStr:function(n){return n+' gün'},
  label:function(n){if(n<0)return F.tr.dayStr(-n)+' önce süresi doldu';if(n===0)return'Bugün sona eriyor';if(n<=100)return F.tr.dayStr(n)+' kaldı';var mo=Math.round(n/30);return mo<24?mo+' ay kaldı':(n/365).toFixed(1).replace('.',',')+' yıl kaldı'},
  when:function(n){return n<0?'süresi <em>'+F.tr.dayStr(-n)+' önce</em> doldu':n===0?'<em>bugün</em> sona eriyor':n===1?'<em>yarın</em> sona eriyor':'<em>'+F.tr.dayStr(n)+'</em> içinde sona eriyor'},
  only:''
};
F.es={
  papers:function(n){return n+' '+pl(n,'documento','documentos')},
  dayStr:function(n){return n+' '+pl(n,'día','días')},
  label:function(n){if(n<0)return'Caducó hace '+F.es.dayStr(-n);if(n===0)return'Caduca hoy';if(n<=100)return pl(n,'Queda ','Quedan ')+F.es.dayStr(n);var mo=Math.round(n/30);return mo<24?'Quedan '+mo+' meses':'Quedan '+(n/365).toFixed(1).replace('.',',')+' años'},
  when:function(n){return n<0?'caducó <em>hace '+F.es.dayStr(-n)+'</em>':n===0?'caduca <em>hoy</em>':n===1?'caduca <em>mañana</em>':'caduca en <em>'+F.es.dayStr(n)+'</em>'},
  only:''
};
F.ar.dayDat=F.ar.dayGen;F.en.dayDat=F.en.dayStr;F.fr.dayDat=F.fr.dayStr;F.tr.dayDat=F.tr.dayStr;F.es.dayDat=F.es.dayStr;

/* ترجمة أنواع القوائم والعلاقات تمرّ عبر t() لأن مفاتيحها عربية */
function t(k,v){
  var s=cur==='ar'?k:(D[cur]&&D[cur][k]!==undefined?D[cur][k]:k);
  if(v)for(var x in v)s=s.split('{'+x+'}').join(v[x]);
  return s;
}
function cname(c,ar){return cur==='ar'?ar:(CN[cur]&&CN[cur][c])||ar}
function fmtDate(iso){
  try{return new Intl.DateTimeFormat(LANGS[cur].loc,{day:'numeric',month:'long',year:'numeric',numberingSystem:'latn'}).format(new Date(iso+'T00:00:00'))}catch(e){return iso}
}
function detect(){
  var l=((navigator.languages&&navigator.languages[0])||navigator.language||'ar').slice(0,2).toLowerCase();
  return LANGS[l]?l:'en';
}

/* تطبيق الترجمة على النصوص الثابتة في الصفحة */
var orig=new WeakMap(),origAttr=new WeakMap();
var ATTRS=['aria-label','placeholder','alt','title'];
function staticPass(){
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n,list=[];
  while((n=w.nextNode()))list.push(n);
  list.forEach(function(n){
    var p=n.parentNode;if(p&&(p.nodeName==='SCRIPT'||p.nodeName==='STYLE'))return;
    if(!orig.has(n))orig.set(n,n.nodeValue);
    var o=orig.get(n),k=o.trim();if(!k)return;
    if(cur==='ar'){n.nodeValue=o;return}
    var tr=D[cur][k];n.nodeValue=tr!==undefined?o.replace(k,tr):o;
  });
  document.querySelectorAll('[aria-label],[placeholder],[alt]').forEach(function(el){
    var m=origAttr.get(el);if(!m){m={};ATTRS.forEach(function(a){if(el.hasAttribute(a))m[a]=el.getAttribute(a)});origAttr.set(el,m)}
    for(var a in m){var k=m[a],tr=cur==='ar'?k:D[cur][k];el.setAttribute(a,tr!==undefined?tr:k)}
  });
}
function setLang(l,silent){
  if(!LANGS[l])l='en';cur=l;
  var h=document.documentElement;h.lang=l;h.dir=LANGS[l].dir;
  document.title=t('أوراقي — إدارة وتجديد أوراقك وأوراق عائلتك');
  var m=document.querySelector('meta[name=description]');if(m)m.setAttribute('content',t('أوراقي: سجّل تواريخ انتهاء الجوازات والإقامات والرخص لك ولعائلتك، ونبّهك قبل الانتهاء مع قائمة المستندات المطلوبة للتجديد.'));
  staticPass();
  if(!silent)loadRenewals(l,function(){document.dispatchEvent(new Event('awraqi-lang'))});
  else document.dispatchEvent(new Event('awraqi-lang'));
}
/* ترجمات قوائم التجديد تُحمَّل عند الحاجة */
var loaded={};
function loadRenewals(l,cb){
  if(l==='ar'||loaded[l]){cb&&cb();return}
  var s=document.createElement('script');s.src='renewals.'+l+'.js';
  s.onload=function(){loaded[l]=1;cb&&cb()};s.onerror=function(){loaded[l]=1;cb&&cb()};
  document.head.appendChild(s);
}
window.I18N={LANGS:LANGS,t:t,F:function(){return F[cur]},lang:function(){return cur},set:setLang,cname:cname,fmt:fmtDate,detect:detect,staticPass:staticPass,load:loadRenewals,dir:function(){return LANGS[cur].dir}};
})();
