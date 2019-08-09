import React from 'react';
import style from './Summery.module.css';
import { connect } from 'react-redux';
import { getDailyRate, getDate, getProducts, getGroupBlood } from './summerySelectors';

const notAllowedProject = {
  1: 'Все зерновые, яйца, молочные продукты, мучные изделия',
  2: 'Все молочные продукты, изделия из пшеничной муки, красное мясо',
  3: 'Все изделия из пшеничной муки, чечевица, арахис, гречка, кукуруза',
  4: 'Все мучные изделия, красное мясо, орехи, кукуруза, фасоль, гречка'
};
const getProductsByGroupBlood = groupBlood => notAllowedProject[groupBlood];
const getCcalSumm = products => {
  let ccalSumm = 0;
  products.map(el => (ccalSumm += el.ccal));
  return ccalSumm;
};

const Summary = ({ products, date, groupBlood, dailyRate }) => (
  <div className={style.summarySection}>
    <div>
      <h3>Сводка за {date}</h3>
      <ul className={style.listSummery}>
        <li>
          <p>Осталось</p>
          <p>{dailyRate - getCcalSumm(products)} ккал</p>
        </li>
        <li>
          <p>Употреблено</p>
          <p>{getCcalSumm(products)} ккал</p>
        </li>
        <li>
          <p>Дневная норма</p>
          <p>{dailyRate} ккал</p>
        </li>
        <li>
          <p>n% от нормы</p>
          <p>{(getCcalSumm(products) * (100 / dailyRate)).toFixed(0)} %</p>
        </li>
      </ul>
    </div>
    <div>
      <h3>Продукты, которые вам не рекомендуется употреблять:</h3>
      <p className={style.pSummery}>{getProductsByGroupBlood(groupBlood)}</p>
    </div>
  </div>
);
const mapStateToProps = state => ({
  products: getProducts(state),
  date: getDate(state),
  groupBlood: getGroupBlood(state),
  dailyRate: getDailyRate(state)
});

export default connect(
  mapStateToProps,
  null
)(Summary);