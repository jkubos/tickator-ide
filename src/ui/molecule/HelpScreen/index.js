import React from 'react'
import classNames from 'classnames'
import styles from './style.less'

import {CenteredContent} from '~/src/ui/quark/CenteredContent'

export class HelpScreen extends React.Component {
  render() {
    return <CenteredContent>
      <h1>Tickator IDE 0.0.1</h1>

      <div>
        <p className={styles.paragraph}>
          Tickator is software model of parallel computation. Model, that
          is way different that multithreading, multiprocessing, functional
          programming, actors, fork-join, Disruptor, you-name-it.
        </p>

        <p className={styles.paragraph}>
          Key properties:
        </p>

        <ul className={styles.list}>
          <li>global tick based</li>
          <li>implicity-masivelly parallel</li>
          <li>change driven</li>
          <li>global lock free</li>
          <li>deterministic</li>
          <li>easy to create and reuse components</li>
          <li>defined by schema</li>
        </ul>

        <p className={styles.paragraph}>
          Because model is so special I am trying to develop special IDE too.
          No necessity for 3 monitors setup with opened 10 windows... Let's
          stick with small tablet screen and build touch interface!
        </p>
      </div>

      <p className={classNames(styles.paragraph, styles.centered)}>
        Get more help about principles on <a href='http://www.tickator.org/articles/what-is-tickator' target='_blank'>tickator.org</a> site.
      </p>

      <p className={classNames(styles.paragraph, styles.centered)}>
        Tickator is developed by <a href='http://www.kubos.cz' target='_blank'>Jaroslav Kuboš</a>
      </p>
    </CenteredContent>
  }
}
