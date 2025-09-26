document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("content-container");
  const navLinks = document.querySelectorAll("nav a");

  // دالة لجلب المحتوى وتشغيل السكريبتات الخاصة به
  const loadContent = async (url) => {
    try {
      // عرض رسالة تحميل
      contentContainer.innerHTML = "<h2>Loading...</h2>";

      // جلب محتوى الصفحة المطلوبة
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Cannot load page: ${response.status}`);
      const html = await response.text();

      // وضع المحتوى في الحاوية
      contentContainer.innerHTML = html;

      // هذه الخطوة مهمة جداً: إعادة تشغيل السكريبتات
      // innerHTML لا يقوم بتشغيل وسوم <script>، لذلك يجب علينا إضافتها يدوياً
      const scripts = contentContainer.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        // إذا كان السكريبت له مصدر خارجي (src)
        if (script.src) {
          newScript.src = script.src;
        } else {
          // إذا كان السكريبت يحتوي على كود داخلي
          newScript.textContent = script.textContent;
        }
        // إضافة السكريبت الجديد إلى نهاية الـ body ليتم تشغيله
        document.body.appendChild(newScript);
        // إزالة السكريبت القديم من المحتوى الذي تم تحميله
        script.remove();
      });
    } catch (error) {
      console.error("Error loading content:", error);
      contentContainer.innerHTML = "<h2>Error: Could not load the page.</h2>";
    }
  };

  // إضافة حدث النقر لكل رابط في القائمة
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // منع الانتقال الافتراضي
      const url = link.getAttribute("href");

      // تحديث شريط العنوان ليبدو وكأننا في صفحة جديدة (اختياري لكن מומלץ)
      history.pushState(
        null,
        "",
        url.replace("pages/", "").replace(".html", "")
      );

      loadContent(url);
    });
  });

  // تحميل الصفحة الرئيسية عند فتح الموقع لأول مرة
  loadContent("pages/home.html");
});
