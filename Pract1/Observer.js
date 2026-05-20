1  // Інтерфейс Observer
 2  class Observer {
 3    update(news) {
 4      throw new Error('Метод update() повинен бути реалізований');
 5    }
 6  }
 7  
 8  // Інтерфейс Subject
 9  class Subject {
10    attach(observer) {
11      throw new Error('Метод attach() повинен бути реалізований');
12    }
13    detach(observer) {
14      throw new Error('Метод detach() повинен бути реалізований');
15    }
16    notify() {
17      throw new Error('Метод notify() повинен бути реалізований');
18    }
19  }
20  
21  // ConcreteSubject — новинне агентство
22  class NewsAgency extends Subject {
23    constructor() {
24      super();
25      this.observers = [];
26      this.latestNews = '';
27    }
28  
29    attach(observer) {
30      this.observers.push(observer);
31    }
32  
33    detach(observer) {
34      this.observers = this.observers.filter(obs => obs !== observer);
35    }
36  
37    notify() {
38      for (const observer of this.observers) {
39        observer.update(this.latestNews);
40      }
41    }
42  
43    publishNews(news) {
44      this.latestNews = news;
45      this.notify();
46    }
47  }
48  
49  // ConcreteObserver — читач новин
50  class NewsReader extends Observer {
51    constructor(name) {
52      super();
53      this.name = name;
54    }
55  
56    update(news) {
57      console.log(`${this.name} отримав новину: "${news}"`);
58    }
59  }
60  
61  // Демонстрація використання
62  const agency = new NewsAgency();
63  
64  const reader1 = new NewsReader('Іван');
65  const reader2 = new NewsReader('Марія');
66  const reader3 = new NewsReader('Олег');
67  
68  agency.attach(reader1);
69  agency.attach(reader2);
70  agency.attach(reader3);
71  
72  agency.publishNews('Вийшла нова версія Node.js 22');
73  
74  agency.detach(reader2);
75  
76  agency.publishNews('JavaScript отримав новий стандарт ES2026');