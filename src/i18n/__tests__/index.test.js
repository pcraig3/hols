
const { getTranslator, getRichTranslator, localizedName } = require('../')
const en = require('../en')
const fr = require('../fr')

describe('i18n', () => {
    test('translates English strings', () => {
        const t = getTranslator('en')

        expect(t('pages.about.title')).toEqual('About')
    })

    test('translates French strings', () => {
        const t = getTranslator('fr')

        expect(t('pages.about.title')).toEqual('À propos')
    })

    test('defaults to English', () => {
        const t = getTranslator()

        expect(t('pages.about.title')).toEqual('About')
    })

    test('keeps English and French translators independent', () => {
        const en = getTranslator('en')
        const fr = getTranslator('fr')

        expect(en('pages.about.title')).toEqual('About')
        expect(fr('pages.about.title')).toEqual('À propos')
        expect(en('pages.about.title')).toEqual('About')
    })

    test('renders HTML with interpolated values', () => {
        const rich = getRichTranslator('en')

        const result = rich('pages.about.calendar', {
            calendarUrl: '/add-holidays-to-calendar',
            year: 2027,
        })

        expect(result).toEqual({
            __html:
                'Heck yes you do! And <a href="/add-holidays-to-calendar" title="you can add Canada’s 2027 holidays to your calendar">you can</a>!',
        })
    })

    test('renders French HTML translations', () => {
        const rich = getRichTranslator('fr')

        const result = rich('pages.about.groundhog', {
            groundhogUrl: 'https://groundhog-day.com',
        })

        expect(result.__html).toContain('jour de la marmotte')
        expect(result.__html).toContain('<strong>pas</strong>')
        expect(result.__html).toContain('href="https://groundhog-day.com"')
    })

    test('escapes interpolated HTML and attribute values', () => {
        const rich = getRichTranslator('en')

        const result = rich('pages.about.intro', {
            holidayName: '<script>alert("x")</script>',
            homeUrl: '/?a=1&b=2',
        })

        expect(result.__html).toContain(
            '<a href="/?a=1&amp;b=2">&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;</a>',
        )
        expect(result.__html).not.toContain('<script>')
    })

    test('returns the English name by default', () => {
        const holiday = {
            nameEn: 'Canada Day',
            nameFr: 'Fête du Canada',
        }

        expect(localizedName(holiday)).toEqual('Canada Day')
    })

    test('returns the French name for French', () => {
        const holiday = {
            nameEn: 'Canada Day',
            nameFr: 'Fête du Canada',
        }

        expect(localizedName(holiday, 'fr')).toEqual('Fête du Canada')
    })

    test('English and French dictionaries have matching keys', () => {
        expect(Object.keys(en.pages.about).sort()).toEqual(
            Object.keys(fr.pages.about).sort(),
        )
    })
})
