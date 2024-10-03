import { Component, Input, Output, EventEmitter, OnInit, Renderer2, ViewChild, ElementRef, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common'; // Para formatar as datas corretamente com base no locale

@Component({
  selector: 'ze-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() listEventMonth: { date: string, textColor: string, backgroundColor?: string, border?: string }[] = [];
  @Input() style: 'bootstrap' | 'material' | 'tce' | 'default' = 'default'; // Estilo como string
  @Input() language: string = 'en-US'; // Novo input para definir o idioma
  @Output() currentDay = new EventEmitter<Date>();

  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentMonth: number = this.currentDate.getMonth();
  currentMonthName: string = '';
  daysInMonth: any[] = [];
  daysOfWeek: string[] = []; // Dias da semana traduzidos

  months: string[] = [];

  constructor(private renderer: Renderer2, @Inject(LOCALE_ID) private locale: string) {}

  ngOnInit() {
    this.setLocale(this.language); // Ajusta o locale baseado no input
    this.loadStyle(this.style);
    this.renderCalendar();
    this.renderDaysOfWeek(); // Traduz os dias da semana ao iniciar
  }

  trackByWeek(index: number) {
    return index;
  }

  trackByMonth(index: number) {
    return index;
  }

  // Função para ajustar o locale e os nomes dos meses com base no idioma
  setLocale(locale: string) {
    this.locale = locale;
    this.months = this.getLocalizedMonths(); // Pega os meses no idioma certo
  }

  // Função para obter os meses com base no idioma
  getLocalizedMonths(): string[] {
    const date = new Date(2024, 0, 1); // Exemplo de data para pegar o mês
    const monthsLocalized: string[] = [];
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      monthsLocalized.push(formatDate(date, 'LLLL', this.locale)); // 'LLLL' é o formato de mês por extenso
    }
    return monthsLocalized;
  }

  // Função para traduzir os dias da semana
  renderDaysOfWeek() {
    const date = new Date();
    this.daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      date.setDate(i + 3); // Ajusta o dia da semana
      this.daysOfWeek.push(formatDate(date, 'EEE', this.locale)); // 'EEE' é o formato curto para dias da semana
    }
  }

  navigateMonth(direction: string): void {
    this.currentMonth = direction === 'prev' ? this.currentMonth - 1 : this.currentMonth + 1;
    if (this.currentMonth < 0 || this.currentMonth > 11) {
      this.currentDate = new Date(this.currentYear, this.currentMonth);
      this.currentYear = this.currentDate.getFullYear();
      this.currentMonth = this.currentDate.getMonth();
    } else {
      this.currentDate = new Date();
    }
    this.renderCalendar();
  }

  loadStyle(style: string) {
    const styleElementId = 'dynamic-theme';
    const existingStyleElement = document.getElementById(styleElementId);
    if (existingStyleElement) {
      this.renderer.removeChild(document.head, existingStyleElement);
    }
    const link = this.renderer.createElement('link');
    link.id = styleElementId;
    link.rel = 'stylesheet';
    link.href = `assets/style/${style}.css`;
    this.renderer.appendChild(document.head, link);
  }

  renderCalendar() {
    this.currentMonthName = this.months[this.currentMonth]; // Traduz o nome do mês baseado no locale
    const firstDateOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const lastDateOfLastMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
    this.daysInMonth = [];

    // Dias do mês anterior
    for (let i = firstDateOfMonth; i > 0; i--) {
      this.daysInMonth.push({ day: lastDateOfLastMonth - i + 1, classStyle: 'inactive', date: new Date(this.currentYear, this.currentMonth - 1, lastDateOfLastMonth - i + 1) });
    }

    // Dias do mês atual
    for (let i = 1; i <= lastDateOfMonth; i++) {
      let isToday = i === this.currentDate.getDate() && this.currentMonth === new Date().getMonth() && this.currentYear === new Date().getFullYear() ? 'active' : '';
      let fullDate = `${this.currentYear}-${(this.currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

      // Get event style for each day in the current month
      const eventStyles = this.getEventStyle(new Date(fullDate));

      this.daysInMonth.push({ day: i, classStyle: isToday, date: new Date(this.currentYear, this.currentMonth, i), styles: eventStyles });
    }

    // Dias do próximo mês
    const remainingDays = 6 - new Date(this.currentYear, this.currentMonth, lastDateOfMonth).getDay();
    for (let i = 1; i <= remainingDays; i++) {
      this.daysInMonth.push({ day: i, classStyle: 'inactive', date: new Date(this.currentYear, this.currentMonth + 1, i) });
    }
  }

  //#TODO IMPLEMENTAR METODO QUANDO nextMonth FOR CHAMADO
  nextMonth() {
  }

  //#TODO IMPLEMENTAR METODO QUANDO prevMonth FOR CHAMADO
  prevMonth() {

  }

  goToToday() {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.currentDay.emit(new Date());
    this.renderCalendar();
  }

  getEventStyle(date: Date): any {
    const event = this.listEventMonth.find(event => new Date(event.date).toDateString() === date.toDateString());
    if (event) {
      return {
        textColor: event.textColor,
        backgroundColor: event.backgroundColor || '',
        border: event.border || ''
      };
    }
    return {};
  }
}
