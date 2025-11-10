import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  private scrollSubject = new Subject<number>();
  private destroy$ = new Subject<void>();
  private lastScrollTop = 0;
  private scrollThreshold = 50;
  private scrollDebounceTime = 10; // ms

  ngOnInit() {
    // Handle scroll events with debouncing
    this.scrollSubject.pipe(
      debounceTime(this.scrollDebounceTime),
      takeUntil(this.destroy$)
    ).subscribe(scrollY => {
      this.isScrolled = scrollY > this.scrollThreshold;
      this.lastScrollTop = scrollY;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.scrollSubject.next(window.scrollY);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  scrollToSection(sectionId: string) {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
