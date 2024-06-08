import { Component } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  articleVisible: boolean = false;

  toggleArticle() {
    this.articleVisible = !this.articleVisible;
  }
}
