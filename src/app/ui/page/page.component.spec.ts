import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '@envs/environment';
import { PageComponent } from './page.component';
import { PAGE_HERO } from './page.constants';

describe('PageComponent', () => {
  let fixture: ComponentFixture<PageComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('debería renderizar la imagen con su URL y texto alternativo', () => {
    const img = host.querySelector<HTMLImageElement>('img.hero__image');

    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe(PAGE_HERO.imageUrl);
    expect(img?.getAttribute('alt')).toBe(PAGE_HERO.imageAlt);
  });

  it('debería renderizar el título y el subtítulo sobre la imagen', () => {
    const caption = host.querySelector('.hero__caption');

    expect(caption?.querySelector('h2')?.textContent?.trim()).toBe(PAGE_HERO.title);
    expect(caption?.querySelector('p')?.textContent?.trim()).toBe(PAGE_HERO.subtitle);
  });

  it('debería mostrar el ambiente del build', () => {
    const badge = host.querySelector('.hero__badge');

    expect(badge?.textContent).toContain(environment.envName);
  });
});
