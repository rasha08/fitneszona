import { Injectable } from '@angular/core';
import { SeoTagsService } from './seo-tags-service';

import * as uniq from 'lodash/uniq';

@Injectable()
export class SeoRulesService {
  constructor(private _seoTagsService: SeoTagsService) {}

  public setSeoTagsForPage(page, articles) {
    switch (page) {
      case 'top':
        this._seoTagsService.setSeoTags(
          'Fitnes Zona - Najčitaniji fitness tekstovi',
          'Najčitaniji fitness tekstovi, saznajte kako da najbrže dođete do savršene figure, ravan stomak, kako se rešiti celulita pred leto, kako izgubiti višak kilograma i još mnogo toga...',
          this.generateKewordsForPage(articles),
          'tekstovi/najnoviji-tekstovi',
          'https://fitneszona.rs/novosti/trening/brazilska_guza_kako_oblikovati_gluteuse/t_s_00378.jpg',
          false
        );
        break;

      case 'latest':
        this._seoTagsService.setSeoTags(
          'Fitnes Zona - Najnoviji fitness tekstovi',
          'Najnoviji fitness tekstovi, kako do savršene figure, kako brzo doći do trbušnjaka, najbolje vežbe za masu, kako brzo napredovati u teretani i još mnogo toga...',
          this.generateKewordsForPage(articles),
          'tekstovi/najcitaniji-tekstovi',
          'https://fitneszona.rs/novosti/trening/cucnjevi/t_s_00373.jpg',
          false
        );
        break;

      case 'index':
        this._seoTagsService.setSeoTags(
          'Fitnes Zona - Najbolji fitness tekstovi',
          'Najbolji fitness tekstovi, brzo i lako do željenog izgleda, najbolje vežbe za zadnjicu, najbolje vežbe za noge, kako brzo postići rezultate u teretani, saznajte kako da se zategnete pred leto i još mnogo toga...',
          this.generateKewordsForPage(articles),
          'https://fitneszona.rs',
          'https://fitneszona.rs/novosti/trening/trening_snage_s_osmehom_na_licu/t_s_00277.jpg',
          false
        );
        break;

      case 'trening':
        this._seoTagsService.setSeoTags(
          'Fitnes Zona - Trening, kako vežbanjem najbrže postići rezultate',
          'Kako da treningom svoje telo dovedete do savršenstva, napravite idealnu figuru, skinete salo sa stomaka rešite se celulita, brzo postignete masu, ili želite brazilsku guzu...',
          this.generateKewordsForPage(articles),
          'tekstovi/trening',
          'http://fitneszona.rs/images/f_z_007.jpg',
          false
        );
        break;

      case 'ishrana':
        this._seoTagsService.setSeoTags(
          'Fitnes Zona - Ishrana, dijete i planovi ishrane za najbrže postizanje sjajnog izgleda',
          'Najbolji saveti za vašu ishranu, kako da dijetama izgubite suvišne kilograme, koja hrana je najbolja za topljenje mastim kako najbrže dobiti masu u teretani...',
          this.generateKewordsForPage(articles),
          'tekstovi/ishrana',
          'http://fitneszona.rs/novosti/ishrana/7_koristi_od_zelene_salate/t_s_00409.jpg',
          false
        );
        break;

      case 'grupni':
        this._seoTagsService.setSeoTags(
          'Fitnes Zona - Grupni treninzi, Vaš vodič kroz grupne treninge',
          'Kako izabrati pravi grupni trening, kojim grupnim treningom se postižu najbrži rezultati, saznajte sve sto vas zanima u vezi plesova i još puno toga...',
          this.generateKewordsForPage(articles),
          'tekstovi/grupni-treninzi',
          'https://fitneszona.rs/novosti/trening/novo_telo_za_25_minuta/t_s_00397.jpg',
          false
        );
        break;
      case 'saveti':
        this._seoTagsService.setSeoTags(
          'Fitnes Zona - Saveti, najbolji saveti za postizanje brzih rezultata u teretani',
          'Najbolji saveti za vaš trening i ishranu. Kako da sa minimalnim trudom postignete što bolje rezultate. Kako da istopite masti u predelu stomaka i imate savršene pločice, kako da oblikuje te noge i zadnjicu...',
          this.generateKewordsForPage(articles),
          'tekstovi/saveti',
          'https://fitneszona.rs/novosti/trening/greske_koje_zene_rade_u_teretani/f_z_039.jpg',
          false
        );
        break;
      case 'yoga':
        this._seoTagsService.setSeoTags(
          'Fitnes Zona - Joga, postanite gospodar svog tela',
          'Disciplina koja podstiče vitalnost tela. Osim što povećava fleksibilnost i smanjuje stres, praktikovanje joge može vam pomoći da pronađete unutrašnji mir.',
          this.generateKewordsForPage(articles),
          'tekstovi/yoga',
          'http://fitneszona.rs/novosti/grupnitreninzi/pranajama_umetnost_yoga_disanja/t_s_00352.jpg',
          false
        );
        break;
      case 'trcanje':
        this._seoTagsService.setSeoTags(
          'Fitnes Zona - Trčanje, kako da budete u savršenoj formi i izgubite višak kilograma',
          'Saveti kako da trčanjem dodjete do savršene forme, kako da sagorite masti, steknete vrhunsku kondiju i kako da vaš stomak bude ravan a noge i zadnjica idealno izvajane',
          this.generateKewordsForPage(articles),
          'tekstovi/trcanje',
          'https://fitneszona.rs/novosti/trening/hocete_da_brze_sagorite_kalorije_uz_trcanje/t_s_00402.jpg',
          false
        );
        break;
      case 'mrsavljenje':
        this._seoTagsService.setSeoTags(
          'Fitnes Zona - Mršavljenje, trening i planovi ishrane za najbrže postizanje sjajnog izgleda',
          'Najbolji saveti za vašu ishranu i trening, kako da dijetama izgubite suvišne kilograme, koja hrana je najbolja za topljenje mastim, kojim treningom ćete najbrže postići rezultate',
          this.generateKewordsForPage(articles),
          'tekstovi/mrsavljenje',
          'http://fitneszona.rs/novosti/ishrana/7_koristi_od_zelene_salate/t_s_00409.jpg',
          false
        );
        break;

      default:
        this._seoTagsService.setSeoTags(
          'Fitnes Zona - Svi Tekstovi, mršavljenje, trening i planovi ishrane za najbrže postizanje sjajnog izgleda',
          'Saveti u vezi ishrane i suplementacije, opis grupnih treninga, yoga, trening u teretani, pravilno vezbanje, mrsavljenje, trening za masu, trening za definiciju, trening koji ste tražili, treninzi koje volite, i sve što poželite',
          this.generateKewordsForPage(articles),
          'tekstovi/svi-tekstovi',
          'http://fitneszona.rs/novosti/trening/50_nijansi_cucnja/t_s_00372.jpg',
          false
        );
        break;
    }
  }

  public setSeoTagsForArticle(article) {
    this._seoTagsService.setSeoTags(
      article.title,
      article.description,
      this.generateKewordsForArticle(article),
      `tekstovi/${article.categoryUrlSlug}/${article.article_title_url_slug}`,
      article.image_url,
      true
    );
  }

  private generateKewordsForPage(articles) {
    return articles.map(article =>
      article.article_title_url_slug
        .split('-')
        .filter(word => this.prepareWordForKeywords(word))
        .reduce((prev, curr) => prev + ',' + curr)
    );
  }

  private generateKewordsForArticle(article) {
    return `${article.title} ${article.description}`
      .toLocaleLowerCase()
      .split(' ')
      .filter(word => this.prepareWordForKeywords(word))
      .reduce((prev, curr) => prev + ',' + curr);
  }

  private prepareWordForKeywords(word) {
    return word
      .replace(/^je$/g, '')
      .replace(/^a$/g, '')
      .replace(/^koji$/g, '')
      .replace(/^kao$/g, '')
      .replace(/^da$/g, '')
      .replace(/^ili$/g, '')
      .replace(/^li$/g, '')
      .replace(/^pa$/g, '')
      .replace(/^od$/g, '')
      .replace(/^do$/g, '')
      .replace(/^kod$/g, '')
      .replace(/^sa$/g, '')
      .replace(/^i$/g, '')
      .replace(/^iz$/g, '')
      .replace(/^pod$/g, '')
      .replace(/^po$/g, '')
      .replace(/^nad$/g, '')
      .replace(/^za$/g, '')
      .replace(/^će$/g, '')
      .replace(/^ce$/g, '')
      .replace(/^tako$/g, '')
      .replace(/^kako$/g, '')
      .replace(/^na$/g, '')
      .replace(/^ako$/g, '')
      .replace(/^u$/g, '')
      .replace(/^sa$/g, '')
      .replace(/^s$/g, '')
      .replace(/^se$/g, '')
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  }
}
