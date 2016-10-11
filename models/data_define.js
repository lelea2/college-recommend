module.exports = [ { name: 'Image 1',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'img',
    help: '',
    prefix: '',
    suffix: '' },
  { name: 'Institution Name',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'text',
    sortable: true,
    help: '',
    prefix: '',
    suffix: '' },
  { name: 'Institution Name',
    help: '',
    suffix: '',
    prefix: '',
    gc_sort_def:
     { name: 'Institution Name',
       control_type: 'edit',
       parent_control_type: '',
       data_type: 'text',
       sortable: true,
       help: '',
       prefix: '',
       suffix: '' },
    sortable: 1 },
  { name: 'StartClass Rank',
    help: 'Smart Rating is based on academic excellence, admissions selectivity, career readiness, financial affordability, and expert opinion (US News, Forbes, and more).',
    suffix: '',
    prefix: '',
    gc_sort_def:
     { name: 'Smart Rating',
       control_type: 'edit',
       parent_control_type: '',
       data_type: 'rating',
       sortable: true,
       help: 'Smart Rating is based on academic excellence, admissions selectivity, career readiness, financial affordability, and expert opinion (US News, Forbes, and more).',
       prefix: '',
       suffix: '',
       high_good: '1',
       percentiles: [Object],
       range_max: null,
       visual_calc: 'medians',
       visual_type: 'smart-rating',
       visual_custom: '0',
       visual_custom_info: null,
       digits_before_decimal: null,
       digits_after_decimal: null,
       units: '' },
    sortable: 1 },
  { name: 'Visit Site', help: '', suffix: '', prefix: '' },
  { name: 'Acceptance Rate',
    help: 'The percentage of students given offers out of all those that applied.',
    suffix: '',
    prefix: '',
    gc_sort_def:
     { name: 'Acceptance Rate',
       control_type: 'edit',
       parent_control_type: '',
       data_type: 'number',
       sortable: true,
       help: 'The percentage of students given offers out of all those that applied.',
       prefix: '',
       suffix: '%',
       add_commas: '1',
       dec_fraction: '1',
       high_good: '-1',
       percentiles: [Object],
       range_max: null,
       suffix_placement: 'auto',
       visual_calc: 'percent',
       visual_type: 'pie',
       visual_custom: '0',
       visual_custom_info: null,
       digits_before_decimal: null,
       digits_after_decimal: null,
       units: '' },
    sortable: 1 },
  { name: 'SAT Score',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: 'Average first-year student SAT score.',
    prefix: '',
    suffix: '',
    high_good: '1',
    percentiles:
     [ '470',
       '1279',
       '1337',
       '1380',
       '1405',
       '1427',
       '1450',
       '1476',
       '1492',
       '1511',
       '1535',
       '1553',
       '1585',
       '1612',
       '1642',
       '1676',
       '1719',
       '1770',
       '1850',
       '2000',
       '2310' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'horizontal-meter',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'ACT Score',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: 'Average performance for first-year students on the ACT.',
    prefix: '',
    suffix: '',
    add_commas: '1',
    high_good: '1',
    percentiles:
     [ '13',
       '18',
       '19',
       '20',
       '20',
       '21',
       '21',
       '21',
       '22',
       '22',
       '22',
       '23',
       '23',
       '24',
       '24',
       '24',
       '25',
       '26',
       '27',
       '30',
       '34' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'horizontal-meter',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'In-State Tuition (2014-15)',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'currency',
    sortable: true,
    help: 'The cost of attendance for first-year undergraduate students who reside in the same state as the school. ',
    prefix: '$',
    suffix: '',
    add_commas: '1',
    high_good: '-2',
    percentiles:
     [ '0',
       '4805',
       '6065',
       '6879',
       '7808',
       '9043',
       '10310',
       '11562',
       '12988',
       '13766',
       '15296',
       '16905',
       '18066',
       '18767',
       '22322',
       '25125',
       '28096',
       '31371',
       '35688',
       '41912',
       '51059' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'horizontal-meter',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'Out-of-State Tuition (2014-15)',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'currency',
    sortable: true,
    help: 'The cost of attendance for first-year undergraduate students who do not reside in the same state as the school. ',
    prefix: '$',
    suffix: '',
    add_commas: '1',
    high_good: '-2',
    percentiles:
     [ '0',
       '6501',
       '9291',
       '10775',
       '12252',
       '13353',
       '14054',
       '15345',
       '16503',
       '17417',
       '18066',
       '18767',
       '20294',
       '22360',
       '24374',
       '26691',
       '29161',
       '31854',
       '36018',
       '41948',
       '51059' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'horizontal-meter',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'Graduation Rate (6 Years)',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: 'Number of students who matriculate in six years over those enrolled for a given year.',
    prefix: '',
    suffix: '%',
    add_commas: '1',
    high_good: '1',
    percentiles:
     [ '0',
       '9',
       '17',
       '23',
       '28',
       '32',
       '35',
       '38',
       '41',
       '44',
       '47',
       '50',
       '53',
       '56',
       '59',
       '63',
       '66',
       '72',
       '78',
       '86',
       '100' ],
    range_max: null,
    suffix_placement: 'auto',
    visual_calc: 'percent',
    visual_type: 'time-circle',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'Median Salary',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: '',
    prefix: '$',
    suffix: '',
    add_commas: '1',
    high_good: '1',
    percentiles:
     [ '29100',
       '35000',
       '36300',
       '37400',
       '38000',
       '39200',
       '40000',
       '40000',
       '40300',
       '41000',
       '41600',
       '42000',
       '42800',
       '43600',
       '44800',
       '45000',
       '46500',
       '48000',
       '50000',
       '54300',
       '77000' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'horizontal-meter',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'Student-to-Faculty Ratio',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: '',
    prefix: '',
    suffix: ':1',
    add_commas: '1',
    high_good: '-1',
    percentiles:
     [ '1',
       '6',
       '8',
       '9',
       '10',
       '11',
       '11',
       '12',
       '13',
       '13',
       '14',
       '14',
       '15',
       '16',
       '17',
       '18',
       '19',
       '20',
       '22',
       '25',
       '51' ],
    range_max: null,
    suffix_placement: 'auto',
    visual_calc: 'medians',
    visual_type: 'ratio-square',
    visual_custom: null,
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: '% of Freshmen on Any Aid',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: 'Percent of full-time first-time undergraduates receiving any financial aid (grants or loans).',
    prefix: '',
    suffix: '%',
    add_commas: '1',
    high_good: '1',
    percentiles:
     [ '0',
       '61',
       '71',
       '78',
       '83',
       '86',
       '89',
       '91',
       '93',
       '94',
       '95',
       '96',
       '97',
       '98',
       '99',
       '99',
       '100',
       '100',
       '100',
       '100',
       '100' ],
    range_max: null,
    suffix_placement: 'auto',
    visual_calc: 'percent',
    visual_type: 'time-circle',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'Average Net Price',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: 'Cost of attendance (including tuition and fees, books and supplies, and living expenses) minus federal, state, and institutional aid.',
    prefix: '$',
    suffix: '',
    add_commas: '1',
    high_good: '-1',
    percentiles:
     [ '838',
       '6954',
       '8789',
       '10610',
       '12095',
       '13313',
       '14418',
       '15498',
       '16655',
       '17673',
       '18556',
       '19317',
       '20466',
       '21715',
       '22789',
       '23718',
       '24590',
       '26203',
       '28292',
       '32285',
       '49996' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'horizontal-meter',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'Institution Name',
    help: '',
    suffix: '',
    prefix: '',
    gc_sort_def:
     { name: 'Institution Name',
       control_type: 'edit',
       parent_control_type: '',
       data_type: 'text',
       sortable: true,
       help: '',
       prefix: '',
       suffix: '' },
    sortable: 1 },
  { name: 'StartClass Rank',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'rating',
    sortable: true,
    help: '',
    prefix: '',
    suffix: '',
    high_good: '-1',
    percentiles:
     [ '1',
       '26',
       '51',
       '76',
       '101',
       '126',
       '151',
       '176',
       '201',
       '226',
       '250.5',
       '275',
       '300',
       '325',
       '350',
       '375',
       '400',
       '425',
       '450',
       '475',
       '500' ],
    range_max: null,
    visual_calc: 'minmax',
    visual_type: 'pyramid',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'Acceptance Rate',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: 'The percentage of students given offers out of all those that applied.',
    prefix: '',
    suffix: '%',
    add_commas: '1',
    dec_fraction: '1',
    high_good: '-1',
    percentiles:
     [ '5.1',
       '30.1',
       '40.3',
       '46.9',
       '51.9',
       '55.5',
       '59',
       '61.6',
       '64.5',
       '67.2',
       '69.6',
       '72.2',
       '74.5',
       '76.6',
       '78.9',
       '81.9',
       '84.6',
       '88.9',
       '93.3',
       '97.4',
       '100' ],
    range_max: null,
    suffix_placement: 'auto',
    visual_calc: 'percent',
    visual_type: 'pie',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'Location',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'text',
    sortable: true,
    help: '',
    prefix: '',
    suffix: '' },
  { name: 'Total Students',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: '',
    prefix: '',
    suffix: '',
    add_commas: '1',
    high_good: '-2',
    percentiles:
     [ '1',
       '112',
       '200',
       '288',
       '395',
       '507',
       '639',
       '835',
       '1060',
       '1299',
       '1559.5',
       '1939',
       '2332',
       '2871',
       '3614',
       '4511',
       '6242',
       '8770',
       '13379',
       '22729',
       '195059' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'quantity-stack',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '',
    sort_only: true },
  { name: 'Total Undergraduate Students',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: '',
    prefix: '',
    suffix: '',
    add_commas: '1',
    high_good: '-2',
    percentiles:
     [ '1',
       '81',
       '157',
       '236',
       '329',
       '422',
       '541',
       '700',
       '895',
       '1103',
       '1356',
       '1621',
       '1921',
       '2326',
       '2861',
       '3729',
       '4871',
       '6845',
       '10326',
       '18101',
       '155872' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'quantity-stack',
    visual_custom: null,
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '',
    sort_only: true },
  { name: 'ID',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: '',
    prefix: '',
    suffix: '',
    high_good: '-2',
    percentiles:
     [ '2',
       '411',
       '818',
       '1089',
       '1422',
       '1782',
       '2060',
       '2392',
       '2748',
       '3006',
       '3314',
       '3643',
       '3930',
       '4263',
       '4564',
       '4926',
       '5969',
       '6754',
       '8258',
       '8880',
       '9025' ],
    range_max: null,
    visual_type: '',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  [],
  { name: 'Liberal Arts or Research',
    control_type: 'combo',
    parent_control_type: '',
    data_type: 'number',
    help: 'A liberal arts college is one that awards at least half of their baccalaureate degrees in liberal arts field. A research university is one that awards at least ten doctoral degrees.',
    prefix: '',
    suffix: '' },
  { name: 'Total Applicants',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: 'Total verified students submitting applications to the university.',
    prefix: '',
    suffix: '',
    add_commas: '1',
    high_good: '-2',
    percentiles:
     [ '0',
       '26',
       '78',
       '169',
       '268',
       '464',
       '720',
       '983',
       '1345',
       '1616',
       '2038',
       '2439',
       '2969',
       '3665',
       '4510',
       '5433',
       '6603',
       '9009',
       '13291',
       '21163',
       '86537' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'horizontal-meter',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'Total Enrolled Freshmen',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: '',
    prefix: '',
    suffix: '',
    add_commas: '1',
    high_good: '-2',
    percentiles:
     [ '1',
       '16',
       '38',
       '62',
       '89',
       '136',
       '181',
       '219',
       '268',
       '316',
       '374.5',
       '446',
       '512',
       '599',
       '726',
       '925',
       '1188',
       '1509',
       '2159',
       '3588',
       '10835' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'quantity-stack',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '' },
  { name: 'Total Students',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: '',
    prefix: '',
    suffix: '',
    add_commas: '1',
    high_good: '-2',
    percentiles:
     [ '1',
       '112',
       '200',
       '288',
       '395',
       '507',
       '639',
       '835',
       '1060',
       '1299',
       '1559.5',
       '1939',
       '2332',
       '2871',
       '3614',
       '4511',
       '6242',
       '8770',
       '13379',
       '22729',
       '195059' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'quantity-stack',
    visual_custom: '0',
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '',
    sort_only: true },
  { name: 'Total Undergraduate Students',
    control_type: 'edit',
    parent_control_type: '',
    data_type: 'number',
    sortable: true,
    help: '',
    prefix: '',
    suffix: '',
    add_commas: '1',
    high_good: '-2',
    percentiles:
     [ '1',
       '81',
       '157',
       '236',
       '329',
       '422',
       '541',
       '700',
       '895',
       '1103',
       '1356',
       '1621',
       '1921',
       '2326',
       '2861',
       '3729',
       '4871',
       '6845',
       '10326',
       '18101',
       '155872' ],
    range_max: null,
    visual_calc: 'medians',
    visual_type: 'quantity-stack',
    visual_custom: null,
    visual_custom_info: null,
    digits_before_decimal: null,
    digits_after_decimal: null,
    units: '',
    sort_only: true } ]
