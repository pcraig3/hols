
const { breadcrumb, speakable } = require('../richSnippets')

describe('breadcrumb localization', () => {
  test('renders French province breadcrumbs', () => {
    const result = breadcrumb({
      region: 'Québec',
      provinceId: 'QC',
      locale: 'fr',
    })

    expect(result.itemListElement).toEqual([
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Canada',
        item: 'https://canada-holidays.ca/fr/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Régions',
        item: 'https://canada-holidays.ca/fr/provinces',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Québec',
      },
    ])
  })

  test('renders English province breadcrumbs', () => {
    const result = breadcrumb({
      region: 'Quebec',
      provinceId: 'QC',
    })

    expect(result.itemListElement[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: 'Regions',
      item: 'https://canada-holidays.ca/provinces',
    })
  })

  test('renders French federal breadcrumbs', () => {
    const result = breadcrumb({
      region: 'Fédéral',
      federal: true,
      locale: 'fr',
    })

    expect(result.itemListElement).toHaveLength(2)
    expect(result.itemListElement[0].item)
      .toBe('https://canada-holidays.ca/fr/')
    expect(result.itemListElement[1].name).toBe('Fédéral')
  })

  test('Canada-wide pages have only the home breadcrumb', () => {
    const result = breadcrumb({
      region: 'Canada',
      locale: 'fr',
    })

    expect(result.itemListElement).toHaveLength(1)
    expect(result.itemListElement[0].item)
      .toBe('https://canada-holidays.ca/fr/')
  })
})

describe('speakable localization', () => {
  test.each([
    [
      { region: 'Canada', path: '/' },
      'Canada’s next holiday',
    ],
    [
      { region: 'Canada', path: '/fr/', locale: 'fr' },
      'Prochain jour férié au Canada',
    ],
    [
      {
        region: 'Québec',
        provinceId: 'QC',
        path: '/fr/provinces/QC',
        locale: 'fr',
      },
      'Prochain jour férié : Québec',
    ],
    [
      {
        region: 'Fédéral',
        federal: true,
        path: '/fr/federal',
        locale: 'fr',
      },
      'Prochain jour férié fédéral au Canada',
    ],
  ])('renders the correct speakable name for %j', (props, expected) => {
    const result = speakable(props)

    expect(result.name).toBe(expected)
    expect(result.url).toBe(
      `https://canada-holidays.ca${props.path}`,
    )
  })
})
