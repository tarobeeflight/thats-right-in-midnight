import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  /**
   * コンストラクタ. CommonService のインスタンスを生成する
   *
   * @memberof CommonService
   */
  constructor(private http: HttpClient) { }

  private readonly seionList = [
    'あ', 'い', 'う', 'え', 'お', 
    'か', 'き', 'く', 'け', 'こ', 
    'さ', 'し', 'す', 'せ', 'そ', 
    'た', 'ち', 'つ', 'て', 'と', 
    'な', 'に', 'ぬ', 'ね', 'の', 
    'は', 'ひ', 'ふ', 'へ', 'ほ', 
    'ま', 'み', 'む', 'め', 'も', 
    'や', 'ゆ', 'よ',
    'ら', 'り', 'る', 'れ', 'ろ', 
    'わ', 
  ];

  private readonly dakuonList = [
    'が', 'ぎ', 'ぐ', 'げ', 'ご', 
    'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 
    'だ', 'づ', 'で', 'ど',
    'ば', 'び', 'ぶ', 'べ', 'ぼ', 
    'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 
  ];

  private readonly hiraganaList = [
    ...this.seionList,
    ...this.seionList,
    ...this.seionList,
    ...this.dakuonList,
  ];

  public getRandomInitial(): string {
    const max = this.hiraganaList.length;
    const random = Math.floor(Math.random() * max);
    return this.hiraganaList[random];
  }

  public getRondomSubject(list: string[]): string {
    const max = list.length;
    const random = Math.floor(Math.random() * max);
    return list[random];
  }

  public getSubjects(): Observable<any> {
    return this.http.get('../assets/data/subjects.json');
  }
}

