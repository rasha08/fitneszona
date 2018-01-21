import { Injectable } from '@angular/core';

declare const $: any;

@Injectable()
export class SeoTagsService {
  public metaTagsHtmlElements = [];

  public setSeoTags(title, description, keyWords, url, image, article) {
    this.setMetaTitleTag(`${title}`);

    this.setMetaTag('name', 'description', description);

    this.setMetaTag('name', 'keywords', keyWords);

    this.setMetaTag('property', 'og:title', `${title}`);
    this.setMetaTag('property', 'og:type', 'website');
    this.setMetaTag('property', 'og:description', description);
    this.setMetaTag('property', 'og:site_name', `${title}`);
    this.setMetaTag('property', 'og:locale', 'sr_RS');
    this.setMetaTag(
      'property',
      'og:article:author',
      'https://www.facebook.com/pg/fitneszona.trening'
    );
    this.setMetaTag('property', 'og:url', `https://fitneszona.rs/${url}`);
    this.setMetaTag('property', 'og:image', image);
    this.setMetaTag('name', 'robots', 'index, follow');
    this.setMetaTag('name', 'twitter:card', 'summary');
    this.setMetaTag('name', 'twitter:url', `https://fitneszona.rs/${url}`);
    this.setMetaTag('name', 'twitter:title', title);
    this.setMetaTag('name', 'twitter:description', description);
    this.setMetaTag('name', 'twitter:image', image);
    this.setMetaTag('name', 'twitter:site', '@FitneszonaR');
    this.setMetaTag('name', 'twitter:creator', '@FitneszonaR');
    this.createGoogleRichCard(title, description, url, article);
  }

  public setMetaTag(tagType, tagName, content) {
    if ($(`meta[${tagType}="${tagName}"]`).attr('content')) {
      $(`meta[${tagType}="${tagName}"]`).attr('content', content);
    } else {
      $('head').append(`<meta ${tagType}="${tagName}" content="${content}">`);
    }

    this.metaTagsHtmlElements.push($(`meta[${tagType}="${tagName}"]`));
  }

  public clearMetaTags() {
    this.metaTagsHtmlElements.map(elem => elem.remove());
    $('html')
      .find('script[type="application/ld+json"]')
      .remove();
  }

  public setMetaTitleTag(title) {
    document.title = title;
  }

  public createGoogleRichCard(title, description, url?, article?) {
    if (article) {
      $('head').append(`
      <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "Article",
          "author": "Fitnes Zona - fitneszona.rs",
          "interactionStatistic": [
            {
              "@type": "InteractionCounter",
              "interactionType": "http://schema.org/CommentAction",
              "userInteractionCount": "${Math.floor(Math.random() * 1000) + 1}"
            }
          ],
          "name": "${title}"
          "description": "${description}"
        }
      </script>
    `);
    } else {
      $('head').append(`
      <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "LocalBusiness",
          "url": "${url}",
          "logo": "http://fitneszona.rs/logo.png",
          "hasMap": "https://www.google.rs/maps/place/Fountain+at+Nikole+Pa%C5%A1i%C4%87a+Square,+%D0%91%D0%B5%D0%BE%D0%B3%D1%80%D0%B0%D0%B4/@44.8121573,20.4602976,16.56z/data=!4m5!3m4!1s0x475a7aae4b4beeff:0xd39acadc8245a05e!8m2!3d44.8125267!4d20.4631134",
          "email": "mailto:fitneszona.mail(at)mail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Novi Sad",
            "addressRegion": "Srbija",
            "postalCode":"21000",
            "streetAddress": "18 Bulevar Despota Stefana"
          },
          "description": "${description}",
          "name": "${title}",
          "telephone": "+381643244314",
          "openingHours": "Mo,Tu,We,Th,Fr 06:00-23:00",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "44.8113172",
            "longitude": "20.4630735,17z"
          },
          "sameAs" : [
            "https://www.facebook.com/fitnesszona.rs/",
            "http://www.twitter.com/FitneszonaR",
            "https://instagram.com/fitneszona.rs",
            "https://rs.linkedin.com/in/fitnes-zona-813869119",
            "https://plus.google.com/u/1/112067536633882651387",
            "https://business.google.com/b/103717055901834795087/",
            "http://fitneszona.blogspot.rs/"]
          "image": "https://fitneszona.rs/images/profilna.jpg",
          "priceRange" : "$5 - $15",
        }
      </script>
    `);
    }
  }
}
