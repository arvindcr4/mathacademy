import type { Question } from "@/lib/curriculum";

const questions: Record<string, Question[]> = {
  // ── fin-kp-1: Return Prediction & Asset Pricing Anomalies ─────────────────
  "return-prediction": [
    {
      id: "q-fin-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Which of the following best describes the "momentum anomaly" in asset pricing?',
      options: [
        "Stocks with low volatility outperform high-volatility stocks over the long run",
        "Stocks that performed well over the past 3–12 months tend to continue outperforming in the near future",
        "Small-cap stocks consistently outperform large-cap stocks regardless of market conditions",
        "Value stocks always outperform growth stocks in rising markets",
      ],
      correctAnswer: 1,
      explanation:
        "The momentum anomaly documents that past 3–12 month winners tend to outperform past losers over the next month, contradicting the weak form of market efficiency.",
      hints: [
        "Think about whether past performance has any predictive power over future short-term returns.",
        "The name hints at a concept from classical mechanics — a body in motion tending to remain in motion in the same direction.",
      ],
    },
    {
      id: "q-fin-kp1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Efficient Market Hypothesis (EMH) in its strong form implies that even insider information cannot be used to consistently earn abnormal returns.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Strong-form EMH asserts that all information—public and private—is already reflected in asset prices, so no investor can consistently beat the market using any information.",
      hints: [
        'Consider what "all information" includes in the context of market efficiency.',
        "Think about whether trading on non-public information would yield alpha under this form.",
      ],
    },
    {
      id: "q-fin-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When using ML for return prediction, which technique is most appropriate for preventing look-ahead bias in a time-series cross-validation scheme?",
      options: [
        "K-fold cross-validation with random shuffling of observations",
        "Purging and embargoing observations around the test fold boundaries",
        "Using dropout regularization during model training",
        "Applying principal component analysis to the feature set before splitting",
      ],
      correctAnswer: 1,
      explanation:
        "Look-ahead bias occurs when information from the test period leaks into the training set through temporally adjacent observations.\n\nPurging removes from the training set any observations whose labels overlap in time with test labels. Embargoing further adds a temporal gap \\(t_{\\text{gap}}\\) after the test set, ensuring no information flows across the boundary:\n\n\\[\n\\text{Train: } t \\in [0, \\, t_{\\text{start}} - t_{\\text{purge}} - t_{\\text{embargo}}) \\quad \\text{Test: } t \\in [t_{\\text{start}}, t_{\\text{end}}]\n\\]\n\nStandard \\(K\\)-fold with random shuffling ignores temporal ordering, allowing future data points to appear in training folds — a serious error in financial time series.",
      hints: [
        "Standard \\(K\\)-fold randomly shuffles data, so a training fold may contain 2022 observations while a test fold contains 2020 data — creating look-ahead bias.",
        "Consider a scenario where a training observation at \\(t=5\\) and a test observation at \\(t=4\\) share information from an overlapping event window.",
      ],
    },
  ],

  // ── fin-kp-2: ML Factor Models (CAPM, Fama-French, PCA) ──────────────────
  "factor-models": [
    {
      id: "q-fin-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Sharpe ratio of a portfolio is defined as (E[Rₚ] − Rƒ) / \\sigmaₚ. If Portfolio A has an annualised excess return of 12% and annualised volatility of 20%, and Portfolio B has excess return 6% and volatility 8%, which has the higher Sharpe ratio?",
      options: [
        "Portfolio B, with Sharpe ratio 0.75, outperforms Portfolio A\'s Sharpe ratio of 0.60",
        "Portfolio A, with Sharpe ratio 0.60, outperforms Portfolio B\'s Sharpe ratio of 0.75",
        "Portfolio A, because it has a higher absolute excess return of 12%",
        "Both portfolios have an identical Sharpe ratio of 0.60",
      ],
      correctAnswer: 0,
      explanation:
        "The Sharpe ratio measures risk-adjusted return: \\(\\text{SR} = \\dfrac{E[R_p] - R_f}{\\sigma_p}\\).\n\nFor Portfolio A: \\(0.12 / 0.20 = 0.60\\).\nFor Portfolio B: \\(0.06 / 0.08 = 0.75\\).\n\nPortfolio B achieves a higher Sharpe ratio of 0.75 versus 0.60 for Portfolio A, meaning it delivers more excess return per unit of risk. The Sharpe ratio rewards efficient risk-taking — not raw return — making it the standard metric for comparing risk-adjusted performance across strategies.",
      hints: [
        "Compute each portfolio\'s Sharpe: divide annualised excess return by annualised volatility.",
        "A higher Sharpe means more excess return earned per unit of risk taken — not necessarily a higher absolute return.",
      ],
    },
    {
      id: "q-fin-kp2-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Fama-French three-factor model extends CAPM by adding which two factors?",
      options: [
        "Momentum (WML) and low volatility (BAB)",
        "Size (SMB) and value (HML)",
        "Profitability (RMW) and investment (CMA)",
        "Liquidity (LIQ) and quality (QMJ)",
      ],
      correctAnswer: 1,
      explanation:
        "Fama and French augmented CAPM with SMB (Small Minus Big — the size premium: long small-cap stocks, short large-cap stocks) and HML (High Minus Low — the value premium: long high book-to-market stocks, short low B/M growth stocks) to capture empirical return patterns unexplained by the market factor alone.\n\nThe model takes the form:\n\n\\[\nE[R_i] - R_f = \\alpha_i + \\beta_{\\text{MKT}} \\cdot (E[R_m] - R_f) + \\beta_{\\text{SMB}} \\cdot \\text{SMB} + \\beta_{\\text{HML}} \\cdot \\text{HML}.\n\\]\n\nHere \\( \\alpha_i \\) is the asset's abnormal return unexplained by the three factors. The model dramatically improved explanatory power over CAPM alone.",
      hints: [
        "One factor captures a systematic return difference between small and large companies by market cap.",
        "The other factor relates to how cheaply a company\'s assets are priced relative to their book value (book-to-market ratio).",
      ],
    },
    {
      id: "q-fin-kp2-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "When applying PCA to a cross-section of stock returns to extract latent factors, the first principal component is always equivalent to the CAPM market factor.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "The first PC captures the direction of maximum variance in returns, which often correlates with the market but is not mathematically identical to it. The market factor is a value-weighted index of all stocks; the first PC is an eigenportfolio of the return covariance matrix, which is an equal-weight combination of stocks in the direction of maximum variance. These coincide only in special cases (e.g., when all stocks have equal variance and correlation).",
      hints: [
        "PCA is defined purely by the data covariance structure, with no reference to capitalisation weights.",
        "The first PC maximises variance; the market factor is a value-weighted sum — these are different mathematical objects.",
      ],
    },
  ],

  // ── fin-kp-3: Alpha Generation & Signal Discovery ─────────────────────────
  "alpha-generation": [
    {
      id: "q-fin-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'In quantitative finance, "alpha" is best described as:',
      options: [
        "The total return of a portfolio over a given period",
        "Return attributable to systematic market exposure",
        "Return in excess of what is explained by risk factor exposures",
        "The annualised standard deviation of portfolio returns",
      ],
      correctAnswer: 2,
      explanation:
        'Alpha represents the idiosyncratic return a strategy earns beyond compensation for bearing systematic risk factors, often called "abnormal return" or manager skill. In the CAPM framework, \\alpha = E[Rₚ] − Rƒ − \\beta\\cdot(E[Rm]−Rƒ); in multi-factor models, it is the intercept of the factor regression.',
      hints: [
        "Think about what is left over once you account for exposure to known risk premia (market, size, value, momentum).",
        "It is the intercept in a factor model regression of portfolio excess returns — the return unexplained by factors.",
      ],
    },
    {
      id: "q-fin-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Multiple-testing bias in signal discovery means that a strategy with a high in-sample Sharpe ratio is very likely to have the same Sharpe ratio out of sample.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        'When many signals are tested, some will appear significant purely by chance (false discoveries). Bailey et al. (2014) derived the "Minimum Backtest Length" needed for a given number of trials to make an in-sample Sharpe ratio credible. Without multiple-testing corrections (Bonferroni, Benjamini-Hochberg, or the haircut Sharpe ratio), in-sample Sharpe ratios are heavily upward-biased and out-of-sample performance is typically much weaker.',
      hints: [
        "If you test 100 random signals at the 5% significance level, how many do you expect to look significant by chance alone?",
        'The "false discovery rate" framework provides a way to control the expected proportion of spurious discoveries when mining large signal libraries.',
      ],
    },
    {
      id: "q-fin-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The information ratio (IR) of an active strategy is defined as:",
      options: [
        "Expected portfolio return divided by portfolio volatility",
        "Active return divided by tracking error",
        "Portfolio Sharpe ratio minus benchmark Sharpe ratio",
        "Jensen\'s alpha divided by total portfolio beta",
      ],
      correctAnswer: 1,
      explanation:
        "The Information Ratio is defined as:\n\n\\[\n\\text{IR} = \\frac{E[R_p] - E[R_b]}{\\sigma(R_p - R_b)},\n\\]\n\nwhere \\(R_p\\) is portfolio return, \\(R_b\\) is benchmark return, and \\(\\sigma(R_p - R_b)\\) is the tracking error — the annualised standard deviation of active returns.\n\nGrinold's Fundamental Law of Active Management states:\n\n\\[\n\\text{IR} \\approx \\text{IC} \\times \\sqrt{\\text{BR}},\n\\]\n\nwhere IC is the Information Coefficient (skill per bet, measured as the rank correlation between predictions and realisations) and BR is the breadth (number of independent bets per year). This explains why even a modest IC can produce a strong IR when applied at sufficient scale.",
      hints: [
        "The IR is analogous to the Sharpe ratio but measured relative to a benchmark rather than the risk-free rate.",
        "The denominator is tracking error — the volatility of active returns (portfolio minus benchmark), not total portfolio volatility.",
      ],
    },
  ],

  // ── fin-kp-4: Market Regime Detection & HMM ───────────────────────────────
  "regime-detection": [
    {
      id: "q-fin-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'In a Hidden Markov Model (HMM) applied to financial markets, what are the "hidden states"?',
      options: [
        "The observed asset prices at each time step",
        "The latent market regimes (e.g. bull, bear, high-volatility) driving observed returns",
        "The parameters of the emission distribution",
        "The transition probabilities between time periods",
      ],
      correctAnswer: 1,
      explanation:
        "HMMs assume that observed returns are generated by an unobserved (hidden) Markov chain of market regimes; the goal is to infer these latent states from the return sequence.",
      hints: [
        'The word "hidden" refers to what you cannot directly observe in the market data.',
        "Think about whether market regime labels (bull/bear) appear directly in price data.",
      ],
    },
    {
      id: "q-fin-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Viterbi algorithm is used in HMMs to find the most likely sequence of hidden states given the observed data.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "The Viterbi algorithm uses dynamic programming to efficiently compute the single most probable hidden-state path through the HMM, given a sequence of observations.",
      hints: [
        "Viterbi is a dynamic programming algorithm—it breaks the problem into overlapping sub-problems.",
        "Compare it to the forward–backward algorithm, which computes marginal state probabilities instead.",
      ],
    },
    {
      id: "q-fin-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When fitting a Gaussian HMM to daily equity returns to detect regimes, which algorithm is used to estimate the model parameters (transition matrix, emission means and covariances)?",
      options: [
        "Gradient descent with L2 regularisation",
        "The Baum-Welch algorithm (a special case of EM)",
        "Ordinary least squares regression",
        "The Kalman filter smoother",
      ],
      correctAnswer: 1,
      explanation:
        "Baum-Welch is the Expectation-Maximisation algorithm applied to HMMs; the E-step uses the forward–backward algorithm to compute state occupancy probabilities, and the M-step updates parameters to maximise expected log-likelihood.",
      hints: [
        "The algorithm alternates between inferring latent state probabilities and updating model parameters.",
        "It is a specialised form of a general latent-variable optimisation framework.",
      ],
    },
  ],

  // ── fin-kp-5: Cross-Sectional Return Prediction ───────────────────────────
  "cross-sectional-ml": [
    {
      id: "q-fin-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In cross-sectional return prediction, the target variable is typically:",
      options: [
        "The absolute price of each asset at the end of the period",
        "The rank or standardised return of each asset relative to the universe",
        "The VIX index level at the prediction horizon",
        "The total market capitalisation of all stocks",
      ],
      correctAnswer: 1,
      explanation:
        "Cross-sectional models predict the relative return ranking across a universe of assets at a given future date, because portfolio construction cares about which stocks outperform others, not absolute levels.",
      hints: [
        "A long-short portfolio profits from correctly identifying relative winners and losers.",
        "Think about what is invariant to overall market direction in a market-neutral strategy.",
      ],
    },
    {
      id: "q-fin-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Rank-transforming features before feeding them into a cross-sectional ML model helps mitigate the influence of outliers in financial data.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Rank transformation maps raw feature values to their ordinal ranks, making the model robust to extreme outliers common in financial data such as earnings surprises or price spikes.",
      hints: [
        "Consider what happens to the rank of a stock\'s P/E ratio when one stock has an extreme P/E of 10,000.",
        "Compare the sensitivity of a rank-based model vs. a raw-value model to a single extreme observation.",
      ],
    },
    {
      id: "q-fin-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which metric is most suitable for evaluating a cross-sectional stock-ranking model?",
      options: [
        "Mean Squared Error (MSE) of predicted vs. actual returns",
        "Rank Information Coefficient (IC), i.e., Spearman correlation of predicted ranks vs. realised returns",
        "AUC-ROC treating top-half stocks as class 1",
        "R-squared of a linear regression of predicted on actual returns",
      ],
      correctAnswer: 1,
      explanation:
        "The Rank IC (Spearman correlation) measures how well the model\'s predicted ranking aligns with realised return ranks, directly targeting the cross-sectional ordering that drives long-short portfolio performance.",
      hints: [
        "MSE penalises magnitude errors; rank IC penalises ordering errors—which matters more for a long-short book?",
        "Spearman\'s correlation is non-parametric and robust to the heavy tails typical in return distributions.",
      ],
    },
  ],

  // ── fin-kp-6: Execution Algorithms (VWAP, TWAP, IS) ──────────────────────
  "execution-algorithms": [
    {
      id: "q-fin-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "VWAP (Volume-Weighted Average Price) execution algorithms aim to:",
      options: [
        "Execute the entire order at market open to guarantee best price",
        "Trade in proportion to historical volume patterns to minimise deviation from the daily VWAP",
        "Always split the order into equal time slices regardless of volume",
        "Execute only during the closing auction to reduce impact",
      ],
      correctAnswer: 1,
      explanation:
        "VWAP algorithms distribute order slices proportionally to forecasted intraday volume curves, aiming to match the market\'s volume-weighted average price and avoid outsized market impact.",
      hints: [
        'VWAP stands for Volume-Weighted Average Price—what does "weighting by volume" imply about scheduling?',
        "Trading more when volume is already high vs. thin periods has different market impact implications.",
      ],
    },
    {
      id: "q-fin-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Implementation Shortfall (IS) measures the difference between the decision price and the average execution price, capturing both market impact and timing risk.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "IS (also called arrival-price slippage) quantifies total trading cost as the gap between the price at decision time and the realised execution price, encompassing market impact, opportunity cost, and timing drift.",
      hints: [
        'The "decision price" is the mid-quote when the order was generated, before any execution begins.',
        "A slower execution reduces market impact but increases exposure to adverse price movement—IS captures both.",
      ],
    },
    {
      id: "q-fin-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the Almgren-Chriss optimal execution framework, the trader faces a trade-off between:",
      options: [
        "Alpha decay and factor exposure",
        "Market impact cost (from trading fast) and price risk (from trading slowly)",
        "Bid-ask spread cost and brokerage commission",
        "Latency advantage and adverse selection risk",
      ],
      correctAnswer: 1,
      explanation:
        "Almgren-Chriss models market impact as increasing with trading speed and price risk as increasing with time remaining; the optimal trajectory balances these two costs according to the trader\'s risk aversion.",
      hints: [
        "Trading your full position immediately has zero timing risk but maximal price impact—what happens at the other extreme?",
        "The framework produces a liquidation trajectory that is a function of a risk-aversion parameter.",
      ],
    },
  ],

  // ── fin-kp-7: Market Microstructure & Adverse Selection ───────────────────
  "market-microstructure": [
    {
      id: "q-fin-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'In market microstructure, the "bid-ask spread" compensates market makers primarily for:',
      options: [
        "Their technology infrastructure costs alone",
        "Inventory risk and adverse selection from informed traders",
        "The regulatory capital they must hold",
        "The brokerage commissions they pay to exchanges",
      ],
      correctAnswer: 1,
      explanation:
        "Market makers earn the spread to compensate for holding inventory risk (prices may move against them) and adverse selection risk (they may trade against better-informed counterparties).",
      hints: [
        "Consider who is on the other side of a market maker\'s trade—could they know more than the maker?",
        "Inventory risk arises because a market maker may accumulate large directional positions.",
      ],
    },
    {
      id: "q-fin-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Kyle lambda (\\lambda) in Kyle\'s model measures the price impact per unit of order flow, with a higher lambda indicating a more liquid market.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "Kyle\'s lambda is the price impact coefficient—higher lambda means prices move more per unit of net order flow, indicating lower liquidity (greater illiquidity), not more.",
      hints: [
        "If a market is highly liquid, should a large trade move the price a lot or a little?",
        "Lambda represents the slope of price change with respect to order imbalance.",
      ],
    },
    {
      id: "q-fin-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The VPIN (Volume-synchronized Probability of Informed Trading) metric is used to:",
      options: [
        "Estimate the cost of crossing the bid-ask spread in basis points",
        "Detect order flow toxicity and predict liquidity crises by measuring order imbalance in volume time",
        "Calculate the optimal order size to minimise slippage",
        "Measure the autocorrelation of mid-price returns at tick frequency",
      ],
      correctAnswer: 1,
      explanation:
        "VPIN approximates the probability of informed trading by measuring the imbalance between buyer- and seller-initiated volume in equal-volume buckets; elevated VPIN has been shown to precede liquidity crises like the 2010 Flash Crash.",
      hints: [
        'VPIN uses "volume time" rather than calendar time—why might that be more informative?',
        "High order imbalance in a short period suggests one side of the market knows something.",
      ],
    },
  ],

  // ── fin-kp-8: RL for Optimal Execution & Market Making ────────────────────
  "rl-trading": [
    {
      id: "q-fin-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "When formulating optimal order execution as an RL problem, the agent\'s action space typically consists of:",
      options: [
        "Choosing which stock to buy across the entire universe",
        "Deciding how many shares to trade (and at what aggression) at each time step",
        "Selecting the target portfolio weights for the next month",
        "Setting the risk-free interest rate for discounting future rewards",
      ],
      correctAnswer: 1,
      explanation:
        "In execution RL, the agent controls the trading schedule: at each step it decides the quantity to trade and order type (e.g., market vs. limit), balancing impact against timing risk.",
      hints: [
        "The goal is to liquidate or acquire a fixed quantity over a horizon—what lever does the agent control?",
        "Compare this to portfolio allocation RL where the action is portfolio weights.",
      ],
    },
    {
      id: "q-fin-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A market-making RL agent that quotes both bid and ask prices profits from the spread when trades occur on both sides, but must manage inventory risk from directional positions.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "**Step 1:** Understand market maker mechanics. A market maker earns the bid-ask spread on round-trip trades but accumulates inventory if one side dominates; the RL agent must learn to adjust quotes to manage this inventory risk.",
      hints: [
        "If only buyers hit the market maker\'s ask, what happens to the maker\'s position over time?",
        "The spread income and inventory risk form the core reward-penalty structure of market-making RL.",
      ],
    },
    {
      id: "q-fin-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the Avellaneda-Stoikov market-making model adapted for RL, the reservation price (mid-quote adjustment) depends on:",
      options: [
        "Only the current bid-ask spread of the asset",
        "The agent\'s current inventory, time remaining, and risk-aversion parameter",
        "The moving average of the last 100 trade prices",
        "The difference between realised and implied volatility",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Understand the reservation price. The Avellaneda-Stoikov reservation price shifts the agent's indifference price based on inventory (to lean against accumulation), time to horizon (urgency), and risk aversion (penalty on variance of wealth).",
      hints: [
        "The reservation price is where the agent would be indifferent between buying and selling.",
        "Holding large inventory close to end-of-day is risky—how should this affect the quoted prices?",
      ],
    },
  ],

  // ── fin-kp-9: High-Frequency Trading & Latency Arbitrage ─────────────────
  "hft-ml": [
    {
      id: "q-fin-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Latency arbitrage in high-frequency trading exploits:",
      options: [
        "Long-term mispricing between a stock\'s fundamental value and market price",
        "Speed advantages to trade on stale quotes before market makers can update them",
        "Earnings surprises announced after market close",
        "Differences in dividend yields across similar equities",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Understand latency arbitrage. Latency arbitrageurs use faster connectivity to react to price-moving events on one venue before slower market makers can cancel or update their quotes on other venues, effectively picking off stale prices.",
      hints: [
        "The profit comes from a time advantage measured in microseconds or nanoseconds.",
        "The victim in this trade is typically a market maker with a quote that has become stale.",
      ],
    },
    {
      id: "q-fin-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "FPGA (Field-Programmable Gate Array) hardware is used in HFT because it can execute deterministic trading logic with nanosecond-level latency, bypassing the operating system.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "**Step 1:** Understand FPGAs in trading. FPGAs implement trading logic directly in hardware, avoiding OS scheduling jitter and software stack overhead, enabling deterministic round-trip latencies in the nanosecond to low-microsecond range.",
      hints: [
        "Software running on a CPU must pass through the OS kernel for network I/O—how much latency does that add?",
        "FPGAs are reconfigurable hardware chips that can implement custom logic pipelines.",
      ],
    },
    {
      id: "q-fin-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "toxic order flow" problem for HFT market makers refers to:',
      options: [
        "Orders that arrive when market volatility is abnormally low",
        "Order flow from informed traders that consistently trades against the market maker\'s position",
        "Large block orders that saturate the exchange matching engine",
        "Orders submitted with incorrect price precision that are rejected by the exchange",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Understand toxic order flow. Toxic flow originates from informed or faster participants who trade against market makers based on superior information or speed, consistently causing the maker to buy high and sell low.",
      hints: [
        "If a counterparty always profits at the market maker\'s expense, what does that say about information asymmetry?",
        "Think about the distinction between uninformed noise traders and informed directional traders.",
      ],
    },
  ],

  // ── fin-kp-10: Limit Order Book Modeling with Deep Learning ──────────────
  "limit-order-book": [
    {
      id: "q-fin-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A limit order book (LOB) records:",
      options: [
        "Only the last traded price and volume for an asset",
        "All outstanding buy and sell limit orders at various price levels, with quantities",
        "The daily OHLC bars for each listed security",
        "Regulatory filings and insider ownership data for listed companies",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Understand the LOB. The LOB aggregates all resting limit orders on both sides (bids and asks) at each price level, providing a real-time view of market depth and supply-demand imbalance.",
      hints: [
        "Think about what information is needed beyond just the last trade price to understand market liquidity.",
        'The "book" metaphor refers to recording pending orders at each price level.',
      ],
    },
    {
      id: "q-fin-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DeepLOB uses convolutional and LSTM layers to capture both spatial (price-level) and temporal dependencies in limit order book data.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "**Step 1:** Understand DeepLOB architecture. DeepLOB applies convolutional layers across the price-level dimension to extract local order book features and LSTM layers to model their evolution over time, enabling mid-price movement prediction.",
      hints: [
        "The spatial dimension of a LOB snapshot is the set of price levels; the temporal dimension is the sequence of snapshots.",
        "Which deep learning building block is designed for sequential data with long-range dependencies?",
      ],
    },
    {
      id: "q-fin-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Order flow imbalance (OFI), a key LOB feature, is computed as:",
      options: [
        "The ratio of total ask volume to total bid volume across all price levels",
        "The change in best-bid quantity minus the change in best-ask quantity over a time interval",
        "The number of market orders minus the number of limit orders in a period",
        "The spread divided by the mid-price, expressed in basis points",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Understand OFI. OFI measures net buying pressure at the top of the book by tracking increases in best-bid size (buy pressure) minus increases in best-ask size (sell pressure), and is a strong short-term price predictor.",
      hints: [
        "OFI focuses on changes at the best bid and ask, not the whole book.",
        "An increase in the best-bid queue signals buyers are more aggressive—how would you measure this?",
      ],
    },
  ],

  // ── fin-kp-11: VaR, CVaR & Tail Risk Estimation ──────────────────────────
  "var-cvar": [
    {
      id: "q-fin-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The 1-day 99% Value-at-Risk (VaR) of a portfolio is $1M. Which statement correctly interprets this?",
      options: [
        "The portfolio will lose at most $1M tomorrow with 99% certainty",
        "There is a 1% probability that tomorrow\'s loss will exceed $1M",
        "The average loss on the worst 1% of trading days is $1M",
        "The portfolio\'s expected loss tomorrow is $1M \\times 0.01 = $10,000",
      ],
      correctAnswer: 1,
      explanation:
        "VaR(\\alpha) is the loss level exceeded with probability (1−\\alpha): for 99% VaR, losses exceed $1M with 1% probability (roughly 2.5 trading days per year). Crucially, VaR says nothing about the magnitude of losses beyond this threshold — a portfolio could lose $1M on 99% days or $100M on the same 1% of days and both have the same VaR. This is the key limitation CVaR/Expected Shortfall addresses.",
      hints: [
        "VaR is a quantile of the P&L distribution, not a bound on the maximum loss.",
        "At 99% confidence, 1% of days should see losses exceeding VaR — roughly 2.5 days per year for daily VaR.",
      ],
    },
    {
      id: "q-fin-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "CVaR at confidence level \\alpha (e.g., 99%) equals the expected loss conditional on the loss exceeding VaR(\\alpha), making it a more informative tail risk measure than VaR alone.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "CVaR(\\alpha) = E[L | L > VaR(\\alpha)] — the average of all losses exceeding the 99th percentile. Unlike VaR, CVaR captures the shape and severity of the tail beyond the threshold. CVaR is also a coherent risk measure (satisfies monotonicity, sub-additivity, translation invariance, and positive homogeneity), making it suitable for portfolio optimization via linear programming.",
      hints: [
        "If VaR(99%) = $1M, CVaR(99%) is the average loss on the worst 1% of days — it could be $5M if the tail is fat.",
        "CVaR\'s sub-additivity means CVaR(A+B) \\leq CVaR(A) + CVaR(B), ensuring diversification is always rewarded.",
      ],
    },
    {
      id: "q-fin-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Black-Scholes option pricing model rests on several key assumptions. Which of the following is NOT an assumption of the standard Black-Scholes model?",
      options: [
        "The underlying asset price follows geometric Brownian motion with constant volatility \\sigma",
        "There are no transaction costs and continuous trading is possible",
        "The risk-free interest rate r is constant over the option\'s life",
        "The underlying asset\'s returns follow a Student-t distribution with fat tails to capture volatility clustering",
      ],
      correctAnswer: 3,
      explanation:
        "Black-Scholes assumes: (1) GBM with constant \\sigma (log-normal returns, no volatility smile/skew); (2) no transaction costs, frictionless markets; (3) constant risk-free rate; (4) no dividends (standard form); (5) European-style exercise; (6) no arbitrage. Student-t distributed returns with fat tails explicitly violate the constant-\\sigma GBM assumption. Real markets exhibit volatility smiles/skews, fat tails, and mean-reversion — extensions like Heston\'s stochastic volatility model address these.",
      hints: [
        "Black-Scholes derives its closed-form from the GBM assumption: dS = \\muS dt + \\sigmaS dW, with \\sigma constant.",
        "If returns had fat tails (Student-t) or volatility clustered (GARCH), you could not derive the Black-Scholes PDE in closed form with constant \\sigma.",
      ],
    },
  ],

  // ── fin-kp-12: Covariance Matrix Estimation & Ledoit-Wolf ────────────────
  "covariance-shrinkage": [
    {
      id: "q-fin-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why is the sample covariance matrix unreliable for portfolio optimisation when the number of assets (p) is comparable to the number of observations (T)?",
      options: [
        "It always overestimates all pairwise correlations toward 1.0",
        "Estimation error causes eigenvalues to be spread too wide, leading to extreme and unstable portfolio weights",
        "It cannot be inverted because it is always singular when p equals T",
        "Historical returns are not stationary so the sample covariance changes sign",
      ],
      correctAnswer: 1,
      explanation:
        "When p/T is not negligible, the sample covariance matrix has noisy eigenvalues (largest are inflated, smallest are deflated), causing the inverse to amplify estimation error and produce extreme portfolio weights.",
      hints: [
        "Random Matrix Theory shows eigenvalue dispersion exceeds true dispersion when p/T is large.",
        "Think about what happens to the inverse of a matrix with very small eigenvalues.",
      ],
    },
    {
      id: "q-fin-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Ledoit-Wolf shrinkage estimates the covariance matrix as a weighted average of the sample covariance matrix and a structured target (e.g., a scaled identity matrix), with the shrinkage intensity chosen analytically.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Ledoit and Wolf derived an analytical, asymptotically optimal shrinkage coefficient that pulls the sample covariance toward a structured estimator, reducing estimation error without cross-validation.",
      hints: [
        'Shrinkage "pulls" extreme estimates toward a more structured, regularised target.',
        "The optimal intensity balances the bias introduced by the target against the variance reduced from shrinking.",
      ],
    },
    {
      id: "q-fin-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "According to Random Matrix Theory (RMT), eigenvalues of a large sample covariance matrix from i.i.d. noise follow which distribution?",
      options: [
        "The chi-squared distribution with p degrees of freedom",
        "The Marchenko-Pastur distribution, bounded between \\lambda_min and \\lambda_max",
        "A standard normal distribution centred at 1",
        "A power-law distribution with infinite variance",
      ],
      correctAnswer: 1,
      explanation:
        "The Marchenko-Pastur law describes the limiting spectral distribution of large sample covariance matrices from random data; eigenvalues outside its support signal true (non-noise) covariance structure.",
      hints: [
        "RMT provides a null distribution for eigenvalues under the hypothesis of pure noise.",
        "Any empirical eigenvalue above the Marchenko-Pastur upper bound likely captures real covariance signal.",
      ],
    },
  ],

  // ── fin-kp-13: Modern Portfolio Theory & Black-Litterman ─────────────────
  "portfolio-optimization": [
    {
      id: "q-fin-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Markowitz mean-variance optimisation, the efficient frontier represents:",
      options: [
        "All portfolios with the highest possible return regardless of risk",
        "The set of portfolios offering maximum expected return for each level of risk",
        "Only the global minimum-variance portfolio",
        "Portfolios that include only risk-free assets",
      ],
      correctAnswer: 1,
      explanation:
        "The efficient frontier is the upper boundary of the feasible portfolio set in mean-variance space; each point on it is Pareto-optimal (you cannot increase return without increasing risk).",
      hints: [
        "Portfolios below the frontier are dominated—there exists a better portfolio with the same risk.",
        "The frontier is traced by solving the quadratic programme for varying target return levels.",
      ],
    },
    {
      id: "q-fin-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Black-Litterman model starts from the market equilibrium returns implied by market capitalisation weights and combines them with investor views using Bayesian updating.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Black-Litterman reverse-engineers equilibrium expected returns from market cap weights (via reverse optimisation) and blends them with subjective views, producing more stable and intuitive portfolio allocations.",
      hints: [
        'The starting point (prior) is derived from what the market implicitly "believes" based on current prices.',
        "Bayesian updating combines the prior with new evidence (investor views) proportional to their precision.",
      ],
    },
    {
      id: "q-fin-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Hierarchical Risk Parity (HRP) improves over traditional mean-variance optimisation primarily by:",
      options: [
        "Using a higher expected return estimate from analyst consensus",
        "Applying hierarchical clustering to the covariance matrix and allocating risk recursively, avoiding matrix inversion",
        "Constraining all asset weights to be equal regardless of risk",
        "Maximising the Sharpe ratio subject to factor exposure constraints",
      ],
      correctAnswer: 1,
      explanation:
        "HRP clusters assets by return similarity, then allocates risk top-down within the dendrogram without inverting the covariance matrix, making it robust to estimation error and numerically stable in high dimensions.",
      hints: [
        "Traditional mean-variance requires inverting the covariance matrix—what goes wrong when it is ill-conditioned?",
        "Hierarchical clustering groups similar assets; risk is then spread across groups and within groups.",
      ],
    },
  ],

  // ── fin-kp-14: Stress Testing & Scenario Analysis ────────────────────────
  "stress-testing": [
    {
      id: "q-fin-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Historical scenario analysis in stress testing involves:",
      options: [
        "Generating millions of random return scenarios using Monte Carlo simulation",
        "Repricing a portfolio under the actual market moves observed during past crisis events",
        "Fitting a parametric model to tail returns and sampling extreme quantiles",
        "Shocking each risk factor independently by two standard deviations",
      ],
      correctAnswer: 1,
      explanation:
        "Historical scenario analysis applies the observed shocks from specific past crises (e.g., 2008 GFC, 2020 COVID crash) to current positions to estimate potential P&L under those conditions.",
      hints: [
        'The word "historical" distinguishes this from hypothetical or model-based scenarios.',
        "Think about what data you would use: modelled scenarios or actual market changes during crises?",
      ],
    },
    {
      id: "q-fin-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Reverse stress testing starts from a predefined outcome (e.g., bank insolvency) and works backward to identify the scenarios that could cause it.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Reverse stress testing inverts the usual direction: instead of applying scenarios and measuring outcomes, it identifies the combinations of risk factor shocks that would produce a specified catastrophic outcome.",
      hints: [
        'Standard stress tests go from scenario to outcome; what does "reverse" imply about the direction?',
        "Regulators use this to uncover non-obvious pathways to institutional failure.",
      ],
    },
    {
      id: "q-fin-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When using a Generative Adversarial Network (GAN) for stress scenario generation, the generator\'s objective is to:",
      options: [
        "Minimise classification loss on historical crisis labels",
        "Produce synthetic market scenarios indistinguishable from real tail events, while the discriminator distinguishes real from fake",
        "Maximise the likelihood of observed daily return sequences under a Gaussian copula",
        "Estimate the conditional VaR using quantile regression",
      ],
      correctAnswer: 1,
      explanation:
        "In a GAN, the generator learns to synthesise realistic crisis scenarios by fooling the discriminator, which in turn improves at distinguishing real historical stress events from generated ones, together producing plausible extreme scenarios.",
      hints: [
        "The GAN minimax game: the generator wins by making the discriminator uncertain.",
        'For stress testing, "realistic" means capturing the fat tails and cross-asset correlations of real crises.',
      ],
    },
  ],

  // ── fin-kp-15: ML Risk Factor Models & PnL Attribution ───────────────────
  "ml-risk-models": [
    {
      id: "q-fin-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "PnL attribution in a factor risk model decomposes portfolio returns into:",
      options: [
        "Only systematic (factor) return and transaction costs",
        "Factor returns (explained by risk factor exposures) and idiosyncratic return (residual alpha)",
        "Long-side return minus short-side return",
        "Realised volatility times portfolio beta",
      ],
      correctAnswer: 1,
      explanation:
        "Factor PnL attribution splits total return into the contribution from each risk factor (factor return \\times exposure) and a residual specific return not explained by the model.",
      hints: [
        "Think of this as a regression: the explained part comes from factors, the unexplained part is the residual.",
        "Portfolio managers use this to know whether returns came from factor bets or stock-picking.",
      ],
    },
    {
      id: "q-fin-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Autoencoders can be used as unsupervised risk factor models by learning a low-dimensional latent representation of asset returns.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "An autoencoder trained to reconstruct a cross-section of returns through a narrow bottleneck learns latent risk factors in the hidden layer, analogous to PCA but with non-linear factor structure.",
      hints: [
        "The bottleneck of an autoencoder compresses information—what does this compression represent in finance?",
        "Compare to PCA, which is a linear autoencoder with orthogonal weight matrices.",
      ],
    },
    {
      id: "q-fin-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a Barra-style risk model, the specific (idiosyncratic) risk of a stock is important because:",
      options: [
        "It is always the dominant source of risk for a diversified portfolio",
        "It captures stock-level variance not explained by factors, which diversifies away in a large portfolio but concentrates in single-stock positions",
        "It is equal to total variance minus the market beta squared",
        "Regulators require reporting specific risk separately from systematic risk",
      ],
      correctAnswer: 1,
      explanation:
        "Specific risk is uncorrelated across stocks by model assumption; in a diversified portfolio it averages out, but for concentrated positions or individual securities it can dominate total risk.",
      hints: [
        "Why does a 500-stock portfolio have much lower stock-specific risk than a 5-stock portfolio?",
        "Factor risk is systematic—it cannot be diversified away; specific risk can be.",
      ],
    },
  ],

  // ── fin-kp-16: Earnings Call NLP & Conference Analysis ───────────────────
  "earnings-nlp": [
    {
      id: "q-fin-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which NLP feature extracted from earnings call transcripts has been shown to have predictive power for future stock returns?",
      options: [
        "The total number of words spoken by the CEO",
        "Sentiment and tone of management language, particularly hedging and uncertainty expressions",
        "The font size used in the accompanying slide deck",
        "The number of analyst questions asked during the Q&A session",
      ],
      correctAnswer: 1,
      explanation:
        "Research shows that linguistic tone—specifically the prevalence of positive vs. negative and certain vs. uncertain language—in earnings calls contains information beyond reported EPS that predicts subsequent returns.",
      hints: [
        "Management language that is evasive or highly uncertain may signal undisclosed problems.",
        "Sentiment analysis of textual data has been widely studied in finance NLP.",
      ],
    },
    {
      id: "q-fin-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Q&A section of an earnings call tends to contain more forward-looking and market-moving information than the prepared management remarks section.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Studies find that the unscripted Q&A portion, where analysts probe management, often reveals more decision-relevant information and generates larger abnormal return reactions than the scripted presentation.",
      hints: [
        "Management presentations are carefully prepared and reviewed by legal/IR—how scripted vs. candid might they be?",
        "Analyst questions are unscripted and may elicit unexpected admissions.",
      ],
    },
    {
      id: "q-fin-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'When building an earnings call NLP pipeline, "speaker diarization" is needed to:',
      options: [
        "Translate non-English earnings calls into English",
        "Segment the audio or transcript into turns attributed to specific speakers (CEO, CFO, analysts)",
        "Extract named entities such as product names and geographic regions",
        "Identify forward-looking statements for safe-harbour compliance",
      ],
      correctAnswer: 1,
      explanation:
        "Speaker diarization partitions the call transcript into segments by speaker, enabling separate analysis of management language vs. analyst questions, which have different informational content.",
      hints: [
        'A call transcript with labels like "Operator:", "John Smith - CEO:", requires knowing who said what.',
        "Many transcript providers already label speakers, but automated diarization handles audio sources.",
      ],
    },
  ],

  // ── fin-kp-17: FinBERT & Financial Sentiment Analysis ────────────────────
  finbert: [
    {
      id: "q-fin-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "FinBERT differs from general-purpose BERT primarily because it:",
      options: [
        "Uses a larger vocabulary with 100,000 tokens instead of 30,000",
        "Was further pre-trained on large financial corpora (news, filings) before fine-tuning on sentiment tasks",
        "Replaces the transformer architecture with a bidirectional LSTM",
        "Is trained exclusively on numerical financial time series rather than text",
      ],
      correctAnswer: 1,
      explanation:
        "FinBERT starts from BERT\'s pre-trained weights and continues pre-training on financial text (Reuters news, SEC filings), then fine-tunes on labelled financial sentiment datasets, adapting representations to financial language.",
      hints: [
        "Financial text contains domain-specific terminology not well-represented in generic web corpora.",
        "Domain adaptation through continued pre-training is a common NLP transfer learning technique.",
      ],
    },
    {
      id: "q-fin-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Lexicon-based sentiment approaches like the Loughran-McDonald dictionary are specifically designed for financial text because general-purpose sentiment lexicons misclassify many finance-specific words.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        'Words like "liability", "risk", and "leverage" are neutral in everyday English but carry negative connotations in financial contexts; Loughran-McDonald built finance-specific positive, negative, and uncertainty word lists to handle this.',
      hints: [
        'Consider the word "liability"—would a general sentiment dictionary label it negatively?',
        "The Harvard General Inquirer, designed for general text, performs poorly on financial documents.",
      ],
    },
    {
      id: "q-fin-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'In financial sentiment analysis, "aspect-level" sentiment is more useful than document-level sentiment because:',
      options: [
        "It is computationally cheaper to compute at the aspect level",
        "It identifies sentiment toward specific entities (company, product, management) within a document, enabling more targeted trading signals",
        "Document-level sentiment is not predictive of any financial outcome",
        "Aspect-level models do not require labelled training data",
      ],
      correctAnswer: 1,
      explanation:
        "A news article may be negative about a supplier but positive about the company itself; aspect-level sentiment disentangles these signals, producing more precise inputs for event-driven strategies.",
      hints: [
        "A mixed-sentiment article could be classified as neutral at document level—what information is lost?",
        "Aspect-level models target sentiment toward a specific entity mentioned in the text.",
      ],
    },
  ],

  // ── fin-kp-18: News Impact on Markets & Event Studies ────────────────────
  "news-impact": [
    {
      id: "q-fin-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'In an event study, the "abnormal return" on an event day is computed as:',
      options: [
        "The raw stock return on the event day",
        "The event-day return minus the expected return predicted by a factor model estimated in a pre-event window",
        "The difference between the stock\'s return and the S&P 500 return",
        "The cumulative return over the three days following the event",
      ],
      correctAnswer: 1,
      explanation:
        "Abnormal return isolates the event\'s price impact by subtracting the counterfactual expected return (estimated from a clean pre-event estimation window) from the observed return on the event day.",
      hints: [
        "The expected return accounts for market-wide moves and the stock\'s systematic risk.",
        "You need a baseline model to know what the stock would have returned absent the event.",
      ],
    },
    {
      id: "q-fin-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Post-earnings announcement drift (PEAD) is consistent with strong-form market efficiency because prices fully adjust to earnings surprises on the announcement day.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "PEAD is an anomaly where stock prices continue to drift in the direction of an earnings surprise for weeks after the announcement, contradicting even semi-strong form efficiency (not just strong form).",
      hints: [
        "If markets were semi-strong efficient, all public information (including earnings) would be priced instantly.",
        "PEAD means that buying positive-surprise stocks after the announcement still generates abnormal returns.",
      ],
    },
    {
      id: "q-fin-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "news decay" function in quantitative news alpha models typically shows that:',
      options: [
        "News impact is constant for 30 days then drops to zero",
        "The predictive power of a news sentiment signal decays exponentially with time, with half-lives often measured in minutes to hours for liquid equities",
        "Older news articles have more impact than recent ones due to investor recency bias",
        "News impact peaks two weeks after publication and then reverts",
      ],
      correctAnswer: 1,
      explanation:
        "Empirical studies show that news alpha decays very rapidly in liquid markets—often with half-lives of minutes to a few hours—as sophisticated participants rapidly incorporate the information into prices.",
      hints: [
        "More liquid markets (e.g., large-cap equities) incorporate information faster than less liquid ones.",
        "What happens to the abnormal return signal as more traders act on the same news?",
      ],
    },
  ],

  // ── fin-kp-19: LLMs for Finance (BloombergGPT, FinGPT) ───────────────────
  "llm-finance": [
    {
      id: "q-fin-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "BloombergGPT is best described as:",
      options: [
        "A rule-based system for parsing Bloomberg terminal commands",
        "A large language model pre-trained on a mixed corpus of financial text and general text, tailored for financial NLP tasks",
        "A reinforcement learning agent for executing Bloomberg equity orders",
        "An open-source alternative to the Bloomberg terminal data feed",
      ],
      correctAnswer: 1,
      explanation:
        "BloombergGPT is a 50-billion parameter LLM trained on a 700B-token corpus combining Bloomberg\'s proprietary financial data with general-purpose text, achieving state-of-the-art performance on financial NLP benchmarks.",
      hints: [
        'The "GPT" in the name indicates a generative pre-trained transformer architecture.',
        "Bloomberg had access to decades of proprietary financial news, filings, and data for training.",
      ],
    },
    {
      id: "q-fin-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "FinGPT adopts an open-source, instruction-tuning approach to financial LLMs, enabling low-cost fine-tuning on financial tasks using LoRA adapters.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "FinGPT provides an open-source framework for fine-tuning LLMs on financial tasks using parameter-efficient methods like LoRA, democratising access to financial NLP capabilities without training from scratch.",
      hints: [
        "LoRA (Low-Rank Adaptation) updates only a small fraction of model parameters during fine-tuning.",
        "The contrast with BloombergGPT is that FinGPT fine-tunes existing open-source LLMs rather than pre-training from scratch.",
      ],
    },
    {
      id: "q-fin-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'A key challenge when using LLMs for financial forecasting is "temporal leakage," which occurs when:',
      options: [
        "The model confuses different companies with similar names",
        'Training data includes documents from after the forecasting date, causing the model to appear to "predict" events it has already seen',
        "The attention mechanism focuses too heavily on numerical tokens rather than textual context",
        "The tokenizer splits financial figures incorrectly, degrading arithmetic reasoning",
      ],
      correctAnswer: 1,
      explanation:
        "Temporal leakage occurs when the LLM\'s training corpus contains future information relative to the test period; because LLMs are trained on large web corpora with unknown cutoff dates, this is a subtle but serious bias in financial evaluation.",
      hints: [
        "If a model was trained on data through 2023, what happens if you test it on 2022 events that were widely discussed in 2023?",
        "This is analogous to look-ahead bias in traditional quantitative backtesting.",
      ],
    },
  ],

  // ── fin-kp-20: SEC Filing Analysis & Financial Reporting ─────────────────
  "sec-filing-analysis": [
    {
      id: "q-fin-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which section of a 10-K filing is most commonly used for NLP-based financial analysis?",
      options: [
        "Item 1 (Business Description)",
        "Item 7 (Management\'s Discussion and Analysis — MD&A)",
        "Item 9 (Changes and Disagreements with Accountants)",
        "Item 14 (Principal Accountant Fees)",
      ],
      correctAnswer: 1,
      explanation:
        "MD&A contains management\'s qualitative commentary on financial performance, risks, and outlook; it is forward-looking and less constrained by accounting rules, making it the richest source of NLP-extractable signals.",
      hints: [
        "The section where management discusses results in their own words is more informative than highly structured financial tables.",
        "MD&A is required by the SEC and contains both retrospective and prospective language.",
      ],
    },
    {
      id: "q-fin-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "XBRL (eXtensible Business Reporting Language) tagging in SEC filings enables automated machine-readable extraction of structured financial data without NLP.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "XBRL is a standardised XML-based markup language mandated by the SEC; it tags financial statement line items with machine-readable labels, allowing direct programmatic extraction of figures without parsing natural language.",
      hints: [
        "XBRL is a structured data format—compare it to extracting numbers from unstructured text.",
        "The SEC provides XBRL data feeds via EDGAR, enabling bulk download of standardised financials.",
      ],
    },
    {
      id: "q-fin-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Boilerplate detection in SEC filings is important for NLP models because:",
      options: [
        "Legal boilerplate contains the most predictive forward-looking statements",
        "Removing standard, repetitive legal language prevents the model from treating copy-pasted text as informative signals",
        "Boilerplate sections are exempt from SEC disclosure requirements",
        "LLMs cannot process documents with repeated n-grams",
      ],
      correctAnswer: 1,
      explanation:
        "Many sections of 10-Ks are largely unchanged between years or across companies; detecting and down-weighting boilerplate ensures the model focuses on genuinely new, company-specific disclosures.",
      hints: [
        "If 80% of a filing is identical to last year\'s, what fraction contains new information?",
        "Cosine similarity between consecutive year filings is a common boilerplate detection metric.",
      ],
    },
  ],

  // ── fin-kp-21: Credit Scoring Models (Logistic to GBM) ───────────────────
  "credit-scoring-models": [
    {
      id: "q-fin-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In credit scoring, logistic regression outputs:",
      options: [
        "The exact probability of default as a discrete value between 0 and 1",
        "The log-odds of default, which is transformed by the sigmoid function to a probability",
        "The expected loss in dollars given a default event",
        "A binary classification label (default/no-default) with no probability estimate",
      ],
      correctAnswer: 1,
      explanation:
        "Logistic regression models the log-odds of the binary outcome as a linear combination of features; applying the sigmoid function converts log-odds to a probability in (0,1), interpretable as the probability of default.",
      hints: [
        "The logistic function maps any real number to the interval (0,1).",
        "The linear part of logistic regression predicts log-odds, not probability directly.",
      ],
    },
    {
      id: "q-fin-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Gradient Boosted Machines (GBMs) typically outperform logistic regression on credit scoring tasks but are harder to interpret for regulatory compliance purposes.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "GBMs capture non-linear interactions and generally achieve higher AUC on credit datasets, but their ensemble nature makes it harder to produce the simple scorecards and weight-of-evidence explanations required by regulators.",
      hints: [
        "Regulators (e.g., OCC, CFPB) require lenders to explain adverse action reasons to applicants.",
        "A logistic scorecard can be printed and explained simply; a 1,000-tree GBM cannot.",
      ],
    },
    {
      id: "q-fin-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "Weight of Evidence" (WoE) transformation for a categorical variable in credit modelling is computed as:',
      options: [
        "log(P(event | category) / P(non-event | category))",
        "log(P(event in category) / P(non-event in category)) \\times (distribution of events − distribution of non-events)",
        "The Gini coefficient of that variable in isolation",
        "The Pearson correlation of the variable with the default indicator",
      ],
      correctAnswer: 0,
      explanation:
        "WoE = ln(% of events in bin / % of non-events in bin), measuring how strongly a category is associated with default relative to non-default; it linearises the relationship for logistic regression and handles missing values naturally.",
      hints: [
        "WoE is defined in terms of the log-ratio of event to non-event rates within each category.",
        "A positive WoE means that bin has a higher proportion of defaults than the overall base rate.",
      ],
    },
  ],

  // ── fin-kp-22: Alternative Data for Credit (Telco, Social) ───────────────
  "alternative-data": [
    {
      id: "q-fin-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Which of the following is an example of "alternative data" used for credit underwriting?',
      options: [
        "Three-year tax returns submitted by the applicant",
        "Mobile phone usage patterns and app behaviour indicating financial stability",
        "The applicant\'s FICO score from a credit bureau",
        "Bank-reported delinquency data on existing loans",
      ],
      correctAnswer: 1,
      explanation:
        "Alternative data in credit refers to non-traditional data sources (telecom behaviour, social media, app usage, utility payments) used to assess creditworthiness, especially for thin-file or unbanked populations.",
      hints: [
        "Traditional credit data comes from bureaus (Equifax, Experian, TransUnion)—alternative data is everything else.",
        "Mobile patterns can reveal income regularity, social stability, and financial behaviour indirectly.",
      ],
    },
    {
      id: "q-fin-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Using zip-code-level data as a credit feature can introduce disparate impact under fair lending law, even if race is not directly used as a variable.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Zip codes are highly correlated with racial composition due to residential segregation; using them as features can produce disparate impact on protected classes even without explicit use of race, creating ECOA compliance risk.",
      hints: [
        "Disparate impact can arise from facially neutral variables that are proxies for protected characteristics.",
        'Regulators apply a "disparate impact" test regardless of intent when a variable causes discriminatory outcomes.',
      ],
    },
    {
      id: "q-fin-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The primary challenge of using social media data for credit scoring is:",
      options: [
        "Social media data is always too sparse to be statistically significant",
        "Privacy regulation, data staleness, and the fact that social profiles are easily manipulated by applicants",
        "Social media companies charge prohibitive API fees that exceed the benefit of the signal",
        "Social media sentiment is always positively correlated with creditworthiness",
      ],
      correctAnswer: 1,
      explanation:
        "Social media credit signals face GDPR/CCPA privacy constraints, rapid information decay, and gaming risk—applicants can curate profiles to appear creditworthy, undermining predictive validity.",
      hints: [
        "If applicants know their social media is scored, how might they change their behaviour?",
        "Privacy laws in many jurisdictions limit what personal data can be used in credit decisions.",
      ],
    },
  ],

  // ── fin-kp-23: PD, LGD & EAD Modeling ────────────────────────────────────
  "pd-lgd-ead": [
    {
      id: "q-fin-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Under the Basel framework, Expected Credit Loss (ECL) is computed as:",
      options: [
        "PD \\times LGD",
        "PD \\times LGD \\times EAD",
        "EAD \\times (1 − Recovery Rate)",
        "PD \\times EAD \\times (1 + Interest Rate)",
      ],
      correctAnswer: 1,
      explanation:
        "Expected Credit Loss = Probability of Default \\times Loss Given Default \\times Exposure at Default; this three-component decomposition is the cornerstone of IRB credit risk capital calculation under Basel II/III.",
      hints: [
        "ECL must account for how likely a default is, how much is owed, and what fraction is lost.",
        "Each component is modelled separately and then multiplied to yield expected loss.",
      ],
    },
    {
      id: "q-fin-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Loss Given Default (LGD) models typically target the variable (1 − recovery rate) and must handle the challenge that LGD values are bounded between 0 and 1 with bimodal distributions.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "LGD is bounded in [0,1] and empirically bimodal (many near-zero recoveries for secured loans and near-full losses for unsecured); specialised models like beta regression or two-stage models are needed rather than ordinary linear regression.",
      hints: [
        "What happens if you fit OLS to a variable bounded in [0,1]? Can predictions go out of bounds?",
        "Secured loans (with collateral) and unsecured loans have very different recovery patterns.",
      ],
    },
    {
      id: "q-fin-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For revolving credit facilities, Exposure at Default (EAD) is modelled using the Credit Conversion Factor (CCF) because:",
      options: [
        "The outstanding balance never changes between origination and default",
        "Borrowers tend to draw down more of their credit line as they approach default, so EAD > current balance",
        "CCF adjusts EAD for interest accrued since origination",
        "Regulatory rules require EAD to equal 100% of the committed facility for all products",
      ],
      correctAnswer: 1,
      explanation:
        'Research shows that borrowers facing financial distress draw down revolving facilities (credit cards, lines of credit) before defaulting; the CCF models this "default surge" so EAD exceeds the current drawn balance.',
      hints: [
        "If a borrower is about to default, would they draw more or less from an available credit line?",
        "CCF captures the additional drawdown above the current balance that occurs on average before default.",
      ],
    },
  ],

  // ── fin-kp-24: Fair Lending & ECOA Compliance ─────────────────────────────
  "fair-lending": [
    {
      id: "q-fin-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Equal Credit Opportunity Act (ECOA) prohibits credit discrimination based on:",
      options: [
        "Credit score and income level",
        "Race, color, religion, national origin, sex, marital status, and age (among others)",
        "Employment industry and geographic location",
        "Requested loan amount and collateral type",
      ],
      correctAnswer: 1,
      explanation:
        "ECOA prohibits discrimination against credit applicants on the basis of race, color, religion, national origin, sex, marital status, and age, as well as receipt of public assistance income.",
      hints: [
        'ECOA identifies "protected classes" based on demographic characteristics unrelated to creditworthiness.',
        "Credit decisions must be based on financial factors like income and credit history, not these protected attributes.",
      ],
    },
    {
      id: "q-fin-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Disparate treatment and disparate impact are both forms of illegal discrimination under fair lending law, but they differ in whether discriminatory intent must be proven.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Disparate treatment requires evidence of discriminatory intent (treating protected classes differently), while disparate impact requires only showing a facially neutral practice causes disproportionate adverse effect on protected classes, regardless of intent.",
      hints: [
        "A lender who intentionally charges higher rates to minority borrowers commits disparate treatment.",
        "A policy that is race-neutral on its face but disproportionately harms minorities is disparate impact.",
      ],
    },
    {
      id: "q-fin-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'In ML model fairness for credit, "equalised odds" requires that:',
      options: [
        "All demographic groups receive the same approval rate",
        "The true positive rate and false positive rate are equal across protected groups",
        "The model\'s predicted probability of default is the same for all groups",
        "Feature importance scores are equal for demographic and non-demographic variables",
      ],
      correctAnswer: 1,
      explanation:
        "Equalised odds, a fairness criterion by Hardt et al., requires that the classifier has equal true positive rates (correctly identified creditworthy applicants) and equal false positive rates (incorrectly approved defaults) across demographic groups.",
      hints: [
        "This criterion conditions on the true outcome label, not just the prediction.",
        "Equal approval rates (demographic parity) is a different, and often incompatible, fairness criterion.",
      ],
    },
  ],

  // ── fin-kp-25: Mortgage Prepayment & Default Prediction ──────────────────
  "mortgage-ml": [
    {
      id: "q-fin-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Mortgage prepayment is primarily driven by:",
      options: [
        "The borrower\'s employment status at origination",
        "Refinancing incentives when market interest rates fall below the borrower\'s note rate",
        "The appraised value of the property at origination",
        "Seasonal effects in property tax payment schedules",
      ],
      correctAnswer: 1,
      explanation:
        'The primary driver of prepayment is the "refinancing incentive"—the spread between the borrower\'s current note rate and prevailing market rates; when rates fall, borrowers refinance to lower their monthly payment.',
      hints: [
        "If you are paying 7% on your mortgage and current rates are 4%, what would you do?",
        "Prepayment is also driven by housing turnover (relocation) and curtailment (extra principal payments).",
      ],
    },
    {
      id: "q-fin-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Survival analysis models like the Cox proportional hazards model are well-suited for mortgage default prediction because they handle censored observations (loans that have not yet defaulted).",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Many loans in a portfolio have not defaulted yet (right-censored); survival models estimate the hazard (instantaneous default rate) while correctly accounting for censoring, unlike logistic regression which treats non-events as identical regardless of loan age.",
      hints: [
        'A loan originated last month and one originated 10 years ago both "non-defaulted"—are they equivalent observations?',
        "Censoring means we know the event has not occurred up to the observation date, but not what happens after.",
      ],
    },
    {
      id: "q-fin-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "double trigger" hypothesis for mortgage default states that default requires:',
      options: [
        "Both the loan-to-value ratio exceeding 1 (negative equity) and a cash-flow shock (income loss or payment shock)",
        "Two consecutive missed payments within any 12-month period",
        "A credit score drop below 620 and a debt-to-income ratio above 43%",
        "Property value declining by more than 20% and mortgage rate resetting above 8%",
      ],
      correctAnswer: 0,
      explanation:
        "The double trigger theory holds that negative equity alone does not cause default (borrowers can continue paying); default occurs when negative equity (inability to sell or refinance) combines with a cash-flow shock that makes payments unaffordable.",
      hints: [
        "Many underwater homeowners kept paying during 2008—what additional factor pushed others into default?",
        'Job loss or income reduction is a common cash-flow shock; negative equity is the "trap" that prevents resolution.',
      ],
    },
  ],

  // ── fin-kp-26: Options Pricing & Neural Network Black-Scholes ─────────────
  "options-pricing-ml": [
    {
      id: "q-fin-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Black-Scholes model assumes which of the following about asset price dynamics?",
      options: [
        "Asset prices follow a jump-diffusion process with Poisson-distributed jumps",
        "Asset prices follow geometric Brownian motion with constant volatility and drift",
        "Asset prices are mean-reverting and bounded between zero and twice the initial price",
        "Asset prices follow a GARCH(1,1) process with time-varying conditional volatility",
      ],
      correctAnswer: 1,
      explanation:
        "Black-Scholes assumes the underlying follows geometric Brownian motion with constant drift (\\mu) and volatility (\\sigma), log-normally distributed returns, continuous trading, and no dividends or transaction costs.",
      hints: [
        "The model derives a closed-form option price under specific distributional assumptions.",
        'The key parameter that markets "back out" from observed prices is the model\'s volatility assumption.',
      ],
    },
    {
      id: "q-fin-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Implied volatility is the value of \\sigma that, when plugged into the Black-Scholes formula, equates the model price to the observed market price of an option.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Since Black-Scholes is monotone in \\sigma, given the observed market price one can numerically invert the formula (e.g., via Newton-Raphson) to recover the unique implied volatility that matches the market price.",
      hints: [
        'Implied volatility is "backed out" from market prices, not estimated from historical returns.',
        "The Black-Scholes formula is a bijection in \\sigma for fixed other inputs.",
      ],
    },
    {
      id: "q-fin-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A neural network trained to price options can encode the no-arbitrage constraint that call option price is convex and monotonically increasing in strike by:",
      options: [
        "Adding L2 regularisation to penalise large weights",
        "Constraining the network architecture so second derivatives with respect to strike are non-negative (e.g., using monotone networks or penalty terms in the loss)",
        "Using dropout to prevent overfitting to training strike-price combinations",
        "Normalising the training targets to unit variance before fitting",
      ],
      correctAnswer: 1,
      explanation:
        "Arbitrage-free neural option pricing models enforce convexity constraints by design (e.g., using positive-weight networks on the strike dimension or adding penalty terms for negative gamma) so that the learned surface satisfies no-arbitrage conditions.",
      hints: [
        "A call option\'s price decreasing with lower strike would allow a free lunch—how do you bake this constraint into a network?",
        "Convexity in strike means the second derivative (gamma) must be non-negative.",
      ],
    },
  ],

  // ── fin-kp-27: Volatility Surface Modeling & Calibration ─────────────────
  "volatility-surface": [
    {
      id: "q-fin-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'The "volatility smile" refers to the empirical observation that:',
      options: [
        "Implied volatility is constant across all strikes for a given expiry",
        "Implied volatility is higher for deep in-the-money and out-of-the-money options than for at-the-money options",
        "Realised volatility is always higher than implied volatility",
        "Volatility is higher for short-dated options than for long-dated options",
      ],
      correctAnswer: 1,
      explanation:
        "The volatility smile is the U-shaped pattern in implied volatility across strikes for a fixed expiry; it contradicts Black-Scholes' constant-volatility assumption and reflects fat tails and skewness in the true return distribution.",
      hints: [
        "If Black-Scholes were correct, implied volatility should be flat across strikes—what does the market tell us?",
        'The "smile" shape is visible when implied vol is plotted against moneyness (strike/forward).',
      ],
    },
    {
      id: "q-fin-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Stochastic volatility models (e.g., Heston) extend Black-Scholes by allowing volatility itself to follow a mean-reverting diffusion process, generating volatility smiles.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "The Heston model introduces a second stochastic process for variance (CIR process), correlated with the asset process; this correlation produces skew, and mean-reversion with vol-of-vol produces the curvature (smile) in the implied volatility surface.",
      hints: [
        "When volatility is stochastic, the return distribution has heavier tails and skewness—how does this affect option prices at different strikes?",
        "The correlation between asset returns and volatility shocks produces the skew observed in equity markets.",
      ],
    },
    {
      id: "q-fin-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SVI (Stochastic Volatility Inspired) parameterises the implied variance smile as a function of log-moneyness using five parameters. A key advantage of SVI is:",
      options: [
        "It is derived from a closed-form solution to the Heston model under all parameters",
        "It is arbitrage-free by construction across strikes and guarantees positive implied density",
        "Its functional form is linear in log-moneyness, enabling fast least-squares calibration while being flexible enough to fit market smiles",
        "It requires no calibration since parameters are fixed by the risk-free rate and dividend yield",
      ],
      correctAnswer: 2,
      explanation:
        "SVI\'s raw parameterisation is linear in the model parameters for fixed shape, enabling fast and robust quasi-explicit least-squares calibration; however, additional constraints must be imposed separately to ensure freedom from calendar and butterfly arbitrage.",
      hints: [
        "A linear-in-parameters model can be calibrated without iterative numerical optimisation.",
        "SVI is popular in practice precisely because of its parsimony and tractable calibration, not because it is arbitrage-free by construction.",
      ],
    },
  ],

  // ── fin-kp-28: Deep Hedging & Reinforcement Learning ─────────────────────
  "deep-hedging": [
    {
      id: "q-fin-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The goal of deep hedging is to:",
      options: [
        "Predict the future price of the underlying asset with a neural network",
        "Learn a hedging strategy (delta) that minimises a risk measure of the hedged P&L, including realistic frictions like transaction costs",
        "Calibrate a stochastic volatility model to the observed option surface",
        "Generate synthetic option price scenarios using a GAN",
      ],
      correctAnswer: 1,
      explanation:
        "Deep hedging trains a neural network to produce a hedging ratio that minimises a convex risk measure (e.g., CVaR) of the net P&L, capturing market frictions (transaction costs, discrete trading) that classical delta-hedging ignores.",
      hints: [
        "Classical Black-Scholes delta-hedging assumes continuous trading and no costs—what does deep hedging relax?",
        "The training objective is a risk measure on terminal wealth, not a pricing formula.",
      ],
    },
    {
      id: "q-fin-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In deep hedging, the network is trained on simulated paths from a market model rather than historical data alone, because historical option paths are too few to train deep networks.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Deep hedging typically uses Monte Carlo paths from a calibrated market model to generate abundant training scenarios; this avoids the data scarcity problem of historical option time series, which cover only a handful of market regimes.",
      hints: [
        "A neural network hedger needs many diverse market scenarios—how many option expiries does history provide?",
        "Simulation allows generating millions of training paths under controlled but realistic dynamics.",
      ],
    },
    {
      id: "q-fin-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The recurrent network architecture used in deep hedging processes market states sequentially because:",
      options: [
        "Options Greeks are defined in continuous time and cannot be computed discretely",
        "The hedging action at each step depends on the current portfolio state, path history (for path-dependent options), and market observables—making it a sequential decision problem",
        "Recurrent networks converge faster than feedforward networks for financial time series",
        "Recurrent networks automatically satisfy the martingale property required for no-arbitrage",
      ],
      correctAnswer: 1,
      explanation:
        "Hedging is inherently sequential: the optimal action depends on current positions and prior market path (especially for path-dependent options like barriers or Asians), making the LSTM/GRU architecture a natural fit for the state-action mapping.",
      hints: [
        "A simple feedforward network maps current observables to hedge ratio—what information is it missing?",
        "Path-dependent options like Asian options have payoffs that depend on the history of prices, not just the final price.",
      ],
    },
  ],

  // ── fin-kp-29: XVA Computation & Monte Carlo ML ───────────────────────────
  "xva-ml": [
    {
      id: "q-fin-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "CVA (Credit Valuation Adjustment) represents:",
      options: [
        "The capital charge for market risk under Basel III",
        "The market value of counterparty default risk embedded in a derivatives contract",
        "The cost of funding a collateralised derivatives portfolio",
        "The difference between VaR and CVaR at the 99% confidence level",
      ],
      correctAnswer: 1,
      explanation:
        "CVA is the difference between the risk-free value and the true (credit-risky) value of a derivative, reflecting the expected loss from counterparty default; it is a key component of fair-value accounting under IFRS 13.",
      hints: [
        "If your counterparty could default, the derivative\'s true value to you is less than the risk-free price—CVA captures this gap.",
        "CVA became critically important after the 2008 crisis revealed counterparty risk in OTC derivatives.",
      ],
    },
    {
      id: "q-fin-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Least-Squares Monte Carlo (LSMC), originally developed for American option pricing, is also used in XVA computation to regress future exposure on basis functions of current state variables.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "LSMC (Longstaff-Schwartz) approximates the conditional expected exposure at each future date by regressing simulated exposures on polynomial basis functions of current state variables, enabling nested simulation to be replaced by regression.",
      hints: [
        "Nested Monte Carlo for XVA requires simulating future scenarios within each outer scenario—how does regression help?",
        "The Longstaff-Schwartz algorithm was first proposed for American option early-exercise decisions.",
      ],
    },
    {
      id: "q-fin-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Neural network-based XVA engines replace traditional LSMC regressions primarily because:",
      options: [
        "Neural networks can approximate the conditional expectation in high-dimensional state spaces better than polynomial basis functions",
        "Neural networks require fewer Monte Carlo scenarios to converge than LSMC",
        "Regulators mandate the use of deep learning for XVA under Basel IV",
        "Neural networks eliminate the need for risk-neutral measure simulation",
      ],
      correctAnswer: 0,
      explanation:
        "As the number of risk factors grows, polynomial basis functions for LSMC suffer from the curse of dimensionality; neural networks are universal approximators that scale to high-dimensional state spaces, making them attractive for multi-factor XVA models.",
      hints: [
        "LSMC with polynomials of degree d in k dimensions requires O(k^d) basis functions—how does this scale?",
        "Neural networks can implicitly learn relevant features of the state space without explicitly enumerating basis functions.",
      ],
    },
  ],

  // ── fin-kp-30: Crypto Markets & DeFi ML ──────────────────────────────────
  "crypto-ml": [
    {
      id: "q-fin-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "On-chain data, a unique feature of crypto markets, refers to:",
      options: [
        "Price data aggregated from centralised exchanges like Coinbase and Binance",
        "Publicly verifiable transaction and wallet activity recorded on the blockchain ledger",
        "News articles and social media posts about cryptocurrency projects",
        "Options and futures pricing data from CME crypto derivatives",
      ],
      correctAnswer: 1,
      explanation:
        "On-chain data includes all activity permanently recorded on the blockchain: wallet addresses, transaction volumes, smart contract interactions, and token flows—publicly available and immutable, unlike off-chain exchange data.",
      hints: [
        "Blockchains are public ledgers—every transaction is visible to anyone who queries the node.",
        "This is fundamentally different from equity markets where individual trades are not publicly attributed to identifiable actors.",
      ],
    },
    {
      id: "q-fin-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Automated Market Makers (AMMs) in DeFi use a constant-product formula (x \\times y = k) instead of a limit order book to determine trade prices.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "AMMs like Uniswap v2 maintain a liquidity pool with reserves x and y of two tokens; the constant-product invariant x\\cdoty=k means the price of a trade is determined by how it shifts the reserve ratio, with no order book or counterparty needed.",
      hints: [
        "In a traditional exchange, buyers and sellers post orders; in an AMM, a smart contract acts as the counterparty.",
        "The constant-product formula implies price impact is automatically larger for larger trades.",
      ],
    },
    {
      id: "q-fin-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Impermanent loss (IL) for a liquidity provider in a constant-product AMM occurs because:",
      options: [
        "The AMM charges a 0.3% fee that erodes the liquidity provider\'s principal over time",
        "Holding tokens in the pool produces a different payoff than holding them outright when prices diverge, due to the rebalancing enforced by the constant-product formula",
        "Gas fees on Ethereum reduce the liquidity provider\'s profit on each trade",
        "The AMM protocol takes a management fee from liquidity providers monthly",
      ],
      correctAnswer: 1,
      explanation:
        'IL arises because the AMM automatically rebalances the pool (selling the appreciating asset, buying the depreciating one) to maintain x\\cdoty=k; this "buy high, sell low" rebalancing produces a position worth less than simply holding both tokens when prices diverge significantly.',
      hints: [
        "Compare the value of your pool share after a 2x price move versus holding the tokens directly—which is worth more?",
        'IL is "impermanent" because it disappears if the price ratio returns to the entry point.',
      ],
    },
  ],
};

Object.assign(questions, {
  // ── fin-kp-31: Risk Management ML ────────────────────────────────────────
  "risk-management-ml": [
    {
      id: "q-fin-kp31-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Historical simulation for VaR computes the portfolio loss distribution by repricing the portfolio under the last T days of actual market returns. What is the primary limitation of this approach?",
      options: [
        "Historical simulation requires matrix inversion, which is numerically unstable",
        "Historical simulation is anchored to the specific historical window and cannot capture loss scenarios worse than any day in that window, understating tail risk when the history lacks extreme events",
        "Historical simulation overestimates VaR because it always uses the worst day as the estimate",
        "Historical simulation requires normally distributed returns, which rarely holds in practice",
      ],
      correctAnswer: 1,
      explanation:
        "Historical simulation uses the empirical distribution of past returns, so it can only model losses observed in the historical window (typically 250-500 days). If the lookback period does not include a crisis, extreme tail risk is invisible. Historical simulation VaR is exactly the empirical quantile of past P&L — no extrapolation beyond observed history.",
      hints: [
        "If the history covers 2012-2022 and excludes the 2008 crisis, how would 2008-style shocks appear in the VaR?",
        "Historical simulation VaR is exactly the empirical quantile of past P&L — no extrapolation beyond observed history.",
      ],
    },
    {
      id: "q-fin-kp31-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "CVaR (Conditional Value at Risk) is a coherent risk measure while VaR is not, because CVaR satisfies sub-additivity: CVaR(A+B) is at most CVaR(A) + CVaR(B), ensuring that diversification is always rewarded.",
      correctAnswer: "True",
      explanation:
        "Artzner et al. (1999) defined coherent risk measures via four axioms: monotonicity, sub-additivity, homogeneity, and translation invariance. VaR fails sub-additivity in general (VaR(A+B) can exceed VaR(A) + VaR(B) for non-normal distributions). CVaR satisfies all four axioms, making it a coherent measure suitable for portfolio optimization.",
      hints: [
        "Sub-additivity violation for VaR: two bonds each with 1% default probability — their combined VaR can exceed the sum.",
        "CVaR is the expected loss in the tail region — averaging over extreme outcomes satisfies sub-additivity.",
      ],
    },
    {
      id: "q-fin-kp31-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Monte Carlo simulation for portfolio VaR requires generating correlated multi-asset return scenarios given a covariance matrix. Which technique correctly generates N correlated asset returns?",
      options: [
        "Generate independent standard normals Z and multiply by the covariance matrix directly",
        "Compute the Cholesky decomposition of the covariance matrix as L times L-transpose, generate independent standard normals Z, and compute r = L times Z — the resulting vector has the target covariance",
        "Generate uniform random variables and apply the inverse CDF for each asset independently",
        "Generate correlated returns by sorting independent samples to match the Spearman rank correlation",
      ],
      correctAnswer: 1,
      explanation:
        "The Cholesky method for correlated sampling: if Z is a vector of i.i.d. N(0,1) variables and L is the lower triangular Cholesky factor of the covariance matrix (sigma = L * L^T), then r = L * Z has covariance L * I * L^T = sigma. Multiplying by sigma directly is incorrect — you need the matrix square root, not sigma itself.",
      hints: [
        "Cholesky: L * L^T = sigma where L is lower triangular. Then r = mu + L * Z gives Cov(r) = sigma.",
        "Multiplying by sigma directly is wrong: you need the square root of the covariance matrix, not sigma itself.",
      ],
    },
  ],

  // ── fin-kp-32: Credit Scoring ML Advanced ────────────────────────────────
  "credit-scoring-ml": [
    {
      id: "q-fin-kp32-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A traditional credit scorecard maps raw features to points using bins and Weight of Evidence transforms, then sums points to a final score. What is the primary regulatory advantage of this approach over a gradient boosted tree model?",
      options: [
        "Scorecards always achieve higher AUC than GBMs on credit datasets",
        "Scorecards are fully transparent and monotone: each feature's contribution is explicit, signed, and interpretable as points, satisfying regulatory requirements for adverse action notices and model documentation",
        "Scorecards require less training data than GBMs, making them preferable for small lenders",
        "Scorecards are immune to overfitting because they use only linear combinations of features",
      ],
      correctAnswer: 1,
      explanation:
        "Regulators (OCC, CFPB, FDIC) require lenders to provide adverse action notices explaining why an applicant was denied. A scorecard can directly state individual feature contributions. GBMs cannot produce such simple reason codes without post-hoc approximation (SHAP values), which may not satisfy strict regulatory interpretability requirements.",
      hints: [
        "Adverse action notice requires feature-level attribution: 'denied due to these specific reasons'.",
        "A scorecard's contribution for each feature is explicit and invariant across applicants — easy to audit and explain.",
      ],
    },
    {
      id: "q-fin-kp32-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Fair lending laws in the US (ECOA and FHA) can be violated by a credit model even if race, gender, and other protected characteristics are not included as explicit model features, if the model produces disparate impact on protected classes.",
      correctAnswer: "True",
      explanation:
        "Disparate impact doctrine holds that facially neutral practices that disproportionately harm protected groups are discriminatory absent business necessity justification. Proxy variables (zip code, social network features) correlated with race can produce disparate impact even without explicit race inputs. ML models must be tested for disparate impact across protected classes under the 80% rule.",
      hints: [
        "The four-fifths rule: if the approval rate for a protected group is less than 80% of the highest group's rate, disparate impact is flagged.",
        "Zip code is highly correlated with race due to residential segregation — using it can create disparate impact.",
      ],
    },
    {
      id: "q-fin-kp32-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SR 11-7 (OCC Supervisory Guidance on Model Risk Management) requires lenders to maintain model documentation and conduct ongoing model validation. Which of the following is NOT a required component of model documentation under SR 11-7?",
      options: [
        "Description of the model's purpose, assumptions, and limitations",
        "Validation results including out-of-sample performance metrics and stability tests",
        "A guarantee that the model will achieve at least 75% AUC on future data",
        "Data quality assessments and feature selection rationale",
      ],
      correctAnswer: 2,
      explanation:
        "SR 11-7 requires: purpose/theory documentation, data lineage, assumptions and limitations, validation results, and ongoing performance monitoring. It does NOT require performance guarantees — such guarantees are impossible since future data distributions can shift. Model validation must be performed by an independent team including out-of-time testing and sensitivity analysis.",
      hints: [
        "SR 11-7 is about process and rigor, not about promising performance outcomes.",
        "Validation must include out-of-time testing, stress testing, and sensitivity analysis performed by an independent team.",
      ],
    },
  ],

  // ── fin-kp-33: Insurance ML ───────────────────────────────────────────────
  "insurance-ml": [
    {
      id: "q-fin-kp33-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In auto insurance telematics, a Usage-Based Insurance (UBI) model uses GPS and accelerometer data. Which driving feature is most directly predictive of accident risk?",
      options: [
        "Total miles driven per month — higher mileage correlates with more exposure",
        "Hard braking events per mile — a direct behavioral proxy for aggressive driving strongly correlated with at-fault accident frequency",
        "Number of unique roads driven — more road diversity indicates geographic risk",
        "Time of first engine start each day — proxy for commuting behavior",
      ],
      correctAnswer: 1,
      explanation:
        "Telematics research consistently identifies hard braking frequency as a top predictor of accident risk: it captures aggressive driving behavior, poor following distance, and slow reaction to hazards. It is causal (aggressive braking is a risk behavior) rather than a mere proxy, making it both predictive and legally defensible in most jurisdictions.",
      hints: [
        "Exposure (miles driven) explains when accidents can happen; hard braking explains how likely they are given exposure.",
        "Hard braking is directly observable and available in real time from accelerometers — ideal for UBI scoring.",
      ],
    },
    {
      id: "q-fin-kp33-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Insurance claims fraud detection is a highly imbalanced classification problem where fraudulent claims typically represent less than 5% of all claims, requiring techniques such as oversampling, undersampling, or cost-sensitive learning to achieve useful fraud detection rates.",
      correctAnswer: "True",
      explanation:
        "Fraud rates of 1-5% mean a naive model predicting all claims as legitimate achieves 95%+ accuracy but detects no fraud. SMOTE (Synthetic Minority Over-sampling Technique) generates synthetic fraud examples to balance training data; cost-sensitive learning assigns higher misclassification cost to missed fraud cases. Precision-recall curves are more informative than ROC curves for this imbalanced setting.",
      hints: [
        "A model with 99% accuracy but 0% fraud recall is useless for fraud detection despite high accuracy.",
        "SMOTE creates synthetic minority class examples by interpolating between existing minority samples in feature space.",
      ],
    },
    {
      id: "q-fin-kp33-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Generalized Linear Models (GLMs) with log link and Tweedie distributions are the actuarial standard for claims severity modeling. What is the primary advantage over ordinary least squares regression for insurance loss modeling?",
      options: [
        "GLMs are faster to train than OLS because they use gradient descent rather than matrix inversion",
        "GLMs with log link enforce non-negative predictions and model multiplicative interactions between rating factors, matching the multiplicative structure of insurance tariffs and the right-skewed, zero-inflated nature of insurance losses",
        "GLMs always achieve higher predictive accuracy than OLS because they use regularization by default",
        "GLMs are preferred because they can handle more than 100 features without overfitting",
      ],
      correctAnswer: 1,
      explanation:
        "Insurance pricing uses multiplicative rating factors (base rate times age factor times vehicle factor). A log-link GLM models log(E[Y]) = X*beta, equivalent to a multiplicative structure on expected loss. OLS models additive structure and can predict negative losses. Tweedie distributions handle the right-skewed, zero-inflated nature of insurance loss data.",
      hints: [
        "Multiplicative tariff: premium = base * f_age * f_vehicle * f_region. Log-link GLM models exactly this structure.",
        "Insurance losses are non-negative and right-skewed — Gaussian OLS is inappropriate; Tweedie handles zero-inflated positives.",
      ],
    },
  ],

  // ── fin-kp-34: Trading Signals ────────────────────────────────────────────
  "trading-signals": [
    {
      id: "q-fin-kp34-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Information Coefficient (IC) is defined as the Spearman rank correlation between predicted returns and realized returns. An IC of 0.05 is considered useful for a quantitative equity strategy. Why is IC so low in practice?",
      options: [
        "IC is computed on monthly returns, which are inherently noisy compared to daily predictions",
        "Financial markets are highly competitive: most alpha signals are arbitraged away, leaving IC near zero. The residual IC of 0.05, applied with high breadth via the Fundamental Law of Active Management, compounds into economically significant returns",
        "IC of 0.05 means the model is wrong 95% of the time and should be discarded",
        "Low IC is caused by transaction costs that reduce gross alpha to near zero",
      ],
      correctAnswer: 1,
      explanation:
        "Grinold's Fundamental Law: IR = IC times sqrt(Breadth). An IC of 0.05 applied across 500 stocks per month (breadth = 6000 trades per year) gives IR = 0.05 times sqrt(6000) approximately 3.87 — an excellent information ratio. Low IC is expected because markets incorporate obvious signals; persistent small IC from novel signals is very valuable when applied at scale.",
      hints: [
        "Fundamental Law: IR = IC times sqrt(N), where N is the number of independent bets per year.",
        "IC = 0.05 means signals are barely better than random, but systematic application at high breadth amplifies even tiny edges.",
      ],
    },
    {
      id: "q-fin-kp34-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Signal decay (alpha decay) refers to the decrease in predictive power of a trading signal as the holding period increases. Momentum signals typically have longer alpha decay (weeks to months) while microstructure signals decay within seconds to minutes.",
      correctAnswer: "True",
      explanation:
        "Alpha decay depends on how quickly arbitrageurs can detect and trade against a signal. Microstructure signals (order flow imbalance, bid-ask spread) are observable by many HFT participants and decay in milliseconds to minutes. Momentum signals from slower price discovery mechanisms persist for weeks to months. Optimal holding period should match signal half-life.",
      hints: [
        "Signal half-life = time until IC decays to half its peak value. Match rebalancing frequency to the signal half-life.",
        "Overstaying a signal past its half-life means holding a position with no longer positive expected alpha.",
      ],
    },
    {
      id: "q-fin-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A strategy shows CAPM alpha of 2% per year with t-statistic 1.8 over 5 years of monthly data. How should a quantitative analyst interpret this result?",
      options: [
        "Alpha is statistically significant at the 95% level and the strategy is clearly generating excess returns",
        "A t-stat of 1.8 falls below the conventional 2.0 threshold for 95% significance; with only 60 monthly observations the alpha estimate is imprecise and the strategy may not have reliably positive alpha — more data or out-of-sample evidence is needed",
        "The strategy should be immediately deployed because any positive alpha is worth capturing",
        "A t-stat of 1.8 implies the strategy has negative Sharpe ratio and should be abandoned",
      ],
      correctAnswer: 1,
      explanation:
        "t-stat = 1.8 corresponds to p-value approximately 0.075 — not significant at 95%. With 60 monthly observations, the standard error of the alpha estimate is large. Harvey, Liu, and Zhu (2016) argue that given the multiple comparison problem in quant research, a minimum t-stat of 3.0 should be required for credible alphas.",
      hints: [
        "t-stat less than 2 means the p-value exceeds 5% — conventional threshold for statistical significance is not met.",
        "Harvey et al. (2016): with thousands of strategies tested historically, the threshold for a real alpha should be t-stat greater than 3.0.",
      ],
    },
  ],

  // ── fin-kp-35: Portfolio Construction ML ─────────────────────────────────
  "portfolio-construction-ml": [
    {
      id: "q-fin-kp35-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Mean-variance optimization (MVO) is often called an 'error maximizer.' What causes the extreme sensitivity of MVO portfolio weights to small changes in expected return estimates?",
      options: [
        "MVO is a non-convex optimization problem with many local minima",
        "MVO inverts the covariance matrix, which amplifies estimation errors in expected returns into extreme portfolio weights — the optimizer exploits estimation error rather than true signal",
        "MVO fails to account for transaction costs, causing frequent rebalancing",
        "MVO assumes normally distributed returns, which causes it to underweight tail risk assets",
      ],
      correctAnswer: 1,
      explanation:
        "MVO optimal weights: w* = (1/lambda) * Sigma^{-1} * mu. Inverting the covariance matrix amplifies noise: small errors in mu become large errors in w* scaled by the condition number of Sigma. Michaud (1989) called MVO an error maximizer — it overweights assets with overestimated expected returns, concentrating risk in estimation error.",
      hints: [
        "The condition number of the covariance matrix determines how much input errors are amplified in the optimal weights.",
        "Solutions: regularize Sigma (Ledoit-Wolf shrinkage), constrain weights, or use the Black-Litterman prior.",
      ],
    },
    {
      id: "q-fin-kp35-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Black-Litterman model uses Bayesian updating to combine equilibrium market returns (implied by market capitalization weights via reverse optimization) with investor views, producing more stable and diversified portfolio allocations than unconstrained MVO.",
      correctAnswer: "True",
      explanation:
        "Black-Litterman solves MVO instability by: (1) using equilibrium returns Pi = delta * Sigma * w_mkt as the prior (market-implied, well-diversified); (2) combining Pi with subjective views using Bayesian updating to get posterior returns mu_BL. Portfolios derived from mu_BL are more stable because they start from a sensible prior rather than noisy historical returns.",
      hints: [
        "Equilibrium prior: if market weights are mean-variance optimal, what expected returns do they imply?",
        "Bayesian updating: posterior mu_BL balances the market prior and investor views proportional to their confidence.",
      ],
    },
    {
      id: "q-fin-kp35-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An ML-enhanced portfolio construction pipeline uses a neural network to predict factor tilts conditioned on macroeconomic state. What is the key overfitting risk specific to this approach?",
      options: [
        "Neural networks cannot model non-linear relationships between macro variables and factor returns",
        "The model may fit to spurious correlations because the number of macro variables is large relative to the number of independent market cycles in the historical data — leading to near-zero out-of-sample predictability",
        "Factor tilts are bounded between -1 and +1, which causes gradient vanishing in deep networks",
        "The model will always recommend 100% allocation to the highest-performing historical factor",
      ],
      correctAnswer: 1,
      explanation:
        "Economic cycle data is scarce: there have been only 10-15 complete business cycles since 1945. With dozens of macro variables, a neural network can easily find combinations that appear predictive in sample but fail out-of-sample. This is the curse of dimensionality applied to regime-conditional factor timing — requiring strong regularization, walk-forward validation, and economic priors.",
      hints: [
        "Economic cycle scarcity: roughly 10 recessions in 80 years gives very few independent regime-transition events for training.",
        "With 50 macro variables and 10 regime transitions, the model has many more parameters than regimes to learn from.",
      ],
    },
  ],

  // ── fin-kp-36: Market Regime Detection ───────────────────────────────────
  "market-regime-detection": [
    {
      id: "q-fin-kp36-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A Hidden Markov Model (HMM) applied to daily equity returns uses two hidden states representing bull and bear regimes. What property of HMMs makes them appropriate for financial regime detection?",
      options: [
        "HMMs guarantee that the detected regimes are statistically independent",
        "HMMs model returns as draws from regime-specific distributions with Markov transition probabilities between regimes, capturing the persistence of market conditions and the occasional regime shifts observed in financial data",
        "HMMs can detect exactly how many distinct regimes exist in any financial time series",
        "HMMs assume regimes change at a fixed calendar frequency such as monthly",
      ],
      correctAnswer: 1,
      explanation:
        "HMMs are appropriate for markets because: (1) regimes have different statistical properties — different means, volatilities, and correlations; (2) regimes persist — high transition probability to the same state captures momentum; (3) regime shifts are latent (unobservable) — HMMs infer them probabilistically from observed returns. The Baum-Welch algorithm estimates parameters; Viterbi finds the most likely state sequence.",
      hints: [
        "HMM key properties: latent states, state-conditional emission distributions, Markov transition structure.",
        "Financial regimes are persistent — high transition probability to the same state captures regime persistence.",
      ],
    },
    {
      id: "q-fin-kp36-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Volatility clustering in financial markets — the tendency for large price changes to be followed by large price changes of either sign — is the empirical motivation for GARCH models, which model conditional volatility as a function of past squared returns and past conditional variance.",
      correctAnswer: "True",
      explanation:
        "Mandelbrot (1963) and Fama (1965) documented that financial returns exhibit volatility clustering. GARCH(1,1): sigma_t^2 = omega + alpha * r_{t-1}^2 + beta * sigma_{t-1}^2 directly models this: high absolute past return increases current volatility, and high past conditional variance persists into current variance. Volatility clustering means absolute returns are autocorrelated even though returns themselves are not.",
      hints: [
        "Volatility clustering: large changes tend to be followed by large changes, small by small — Mandelbrot (1963).",
        "GARCH persistence: if alpha + beta is close to 1, volatility shocks die out slowly — matching observed slow decay of realized volatility autocorrelation.",
      ],
    },
    {
      id: "q-fin-kp36-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A regime-conditional strategy uses the current market regime (bull/bear/high-vol) to switch between momentum and defensive minimum-variance strategies. The backtest shows significantly better Sharpe ratio than either strategy alone. What is the primary concern?",
      options: [
        "Momentum and minimum-variance strategies are always positively correlated, making regime switching redundant",
        "The regime labels used in backtesting are based on the full historical data, creating look-ahead bias: in real time, regime detection lags true regime transitions, and switching too late means participating in the worst days of a bear market before recognizing the regime",
        "The strategy cannot be implemented because regime detection requires future return data",
        "Regime-conditional strategies always underperform the market due to higher transaction costs",
      ],
      correctAnswer: 1,
      explanation:
        "Regime detection latency is the key practical problem: HMMs detect regime changes with delay after they occur. During a crash, by the time the model confidently labels it a bear regime, the portfolio may have already suffered significant drawdown. The backtest using hindsight-optimal regime labels overstates real-time performance by assuming perfect regime knowledge.",
      hints: [
        "In live trading, the regime can only be known in real time with some lag — but the backtest assumes perfect real-time regime knowledge.",
        "HMM smoothed probabilities (using future data) look cleaner than filtered probabilities (real-time) which are noisier and lag.",
      ],
    },
  ],

  // ── fin-kp-37: ESG ML ─────────────────────────────────────────────────────
  "esg-ml": [
    {
      id: "q-fin-kp37-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "ESG scores from different data providers (MSCI, Sustainalytics, Refinitiv) have surprisingly low cross-provider correlation — often below 0.5. What is the primary reason for this disagreement?",
      options: [
        "Data providers use different corporate databases which have reporting errors",
        "ESG scores aggregate many subjective indicators with no agreed-upon weighting scheme: different providers weight environmental, social, and governance pillars differently, include different metrics, and use different methodologies — making scores incomparable across providers",
        "ESG scores are deliberately made proprietary so investors must subscribe to all providers",
        "ESG ratings are primarily driven by company size, so only large-cap companies have consistent ratings",
      ],
      correctAnswer: 1,
      explanation:
        "Berg, Kolbel, and Rigobon (2022) documented that ESG provider disagreement stems from scope differences (which issues to include), measurement differences (how to measure the same issue), and weighting differences (how much each issue matters). There is no universal standard, unlike financial data which follows GAAP/IFRS.",
      hints: [
        "Unlike financial metrics such as EPS and P/E with standardized accounting rules, ESG has no GAAP equivalent.",
        "Berg et al. (2022) decomposed ESG provider disagreement into scope, measurement, and weighting components.",
      ],
    },
    {
      id: "q-fin-kp37-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Satellite imagery and natural language processing of corporate disclosures are examples of alternative data sources used to independently estimate ESG metrics, reducing reliance on self-reported corporate data that may be subject to greenwashing.",
      correctAnswer: "True",
      explanation:
        "Greenwashing risk: companies control their own ESG disclosures and have incentives to overstate environmental and social performance. Satellite imagery can measure actual carbon emissions, land use, and deforestation; NLP of regulatory filings, news, and NGO reports can identify discrepancies between corporate claims and third-party observations.",
      hints: [
        "Satellite data measures actual methane flares, ship traffic, factory activity — not what companies report.",
        "NLP of 10-K filings versus sustainability reports: inconsistencies between disclosure documents can signal greenwashing.",
      ],
    },
    {
      id: "q-fin-kp37-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An ML model trained to predict future ESG score upgrades uses historical ESG scores, financial data, and news sentiment as features. What is the key methodological concern when backtesting this strategy?",
      options: [
        "ESG scores are not correlated with financial returns so the strategy cannot be profitable",
        "ESG score provider methodologies change over time — point-in-time ESG data must be used in the backtest, as the scores available today for historical dates often reflect retrospective revisions not available at the time of investment",
        "The model needs at least 10 years of data to be statistically valid, and ESG data only dates to 2019",
        "ESG scores are integer-valued and cannot be used as continuous features in ML models",
      ],
      correctAnswer: 1,
      explanation:
        "Point-in-time ESG data is critical: data providers frequently revise historical scores as they refine methodologies, add new metrics, or receive corrected company disclosures. Using the current database for historical backtesting introduces look-ahead bias — the model is trained on scores that were not available to investors at the historical decision point.",
      hints: [
        "ESG providers silently revise historical scores — a company's 2018 score in today's database may differ from what was published in 2018.",
        "Point-in-time data: use only the score actually published on each historical date, not the current database value.",
      ],
    },
  ],

  // ── fin-kp-38: Crypto ML Advanced ────────────────────────────────────────
  "crypto-ml-advanced": [
    {
      id: "q-fin-kp38-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Network Value to Transactions (NVT) ratio compares a cryptocurrency's market cap to daily transaction volume flowing through the network. NVT is analogous to which traditional equity valuation metric?",
      options: [
        "Earnings per share (EPS)",
        "The Price-to-Earnings (P/E) ratio — NVT compares market value to network utility (transaction volume), just as P/E compares market value to earnings",
        "Dividend yield — NVT measures the yield from staking rewards",
        "Book value — NVT measures the ratio of market cap to on-chain assets",
      ],
      correctAnswer: 1,
      explanation:
        "NVT = Market Cap / Daily Transaction Volume (30-day moving average). Just as P/E compares price to earnings power, NVT compares network value to transaction throughput. A high NVT suggests the market cap is high relative to actual usage, potentially indicating overvaluation. Woo (2017) introduced NVT as a fundamental on-chain valuation tool.",
      hints: [
        "P/E = Price divided by Earnings. NVT = Market Cap divided by Transaction Volume. Both compare price to a measure of fundamental value generation.",
        "High NVT = expensive relative to current network usage; low NVT = potentially undervalued or transitioning to higher usage.",
      ],
    },
    {
      id: "q-fin-kp38-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Miner revenue and miner selling behavior are useful on-chain features for predicting Bitcoin price movements because miners have high fixed costs (electricity, hardware) and may be forced to sell holdings when prices fall below their break-even cost, creating predictable supply pressure.",
      correctAnswer: "True",
      explanation:
        "Bitcoin mining economics: miners earn block rewards and transaction fees but have ongoing electricity costs. When BTC price falls near miners' cost of production, economically stressed miners must sell reserves to fund operations. The Puell Multiple (daily miner revenue divided by 365-day moving average of daily revenue) has shown predictive power at historical price inflection points.",
      hints: [
        "Miner cost floor: below a certain price, mining is unprofitable and miners sell holdings to survive.",
        "Puell Multiple extremes have historically coincided with Bitcoin price inflection points in academic research.",
      ],
    },
    {
      id: "q-fin-kp38-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DeFi protocol analysis using on-chain data reveals that Total Value Locked (TVL) is commonly cited but has significant limitations. What is the primary criticism of TVL as a standalone metric?",
      options: [
        "TVL is measured in USD, which is not a meaningful unit for decentralized finance",
        "TVL can be artificially inflated by recursive leverage: users deposit collateral, borrow against it, redeposit the borrowed funds, and repeat — counting the same underlying capital multiple times across protocols",
        "TVL is a lagging indicator that always follows price changes with a 6-month delay",
        "TVL only measures ETH deposits and excludes stablecoin TVL",
      ],
      correctAnswer: 1,
      explanation:
        "TVL double-counting via recursive leverage is well-documented in DeFi: deposit 100 ETH, borrow 80 ETH worth of stablecoins, deposit those stablecoins in another protocol — TVL shows 180 ETH equivalent locked, but only 100 ETH is underlying capital. TVL also mechanically rises with token price appreciation, creating a false signal of growing adoption.",
      hints: [
        "Recursive lending: deposit A, borrow B, deposit B, borrow C — each cycle adds to TVL but underlying capital is the same.",
        "TVL also rises when token prices rise (more USD value of same locked tokens) — not reflecting new capital inflows.",
      ],
    },
  ],

  // ── fin-kp-39: Derivatives ML ─────────────────────────────────────────────
  "derivatives-ml": [
    {
      id: "q-fin-kp39-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Black-Scholes delta of a European call option is N(d1). For an at-the-money call with very short time to expiry, delta approaches which value?",
      options: [
        "Delta approaches 0 because the option has no intrinsic value at-the-money",
        "Delta approaches 0.5 because an at-the-money option has approximately 50% probability of expiring in-the-money, corresponding to N(d1) where d1 approaches 0",
        "Delta approaches 1.0 because all short-dated options are treated as forward contracts",
        "Delta approaches N(0) = 0 because d1 goes to infinity when time approaches 0",
      ],
      correctAnswer: 1,
      explanation:
        "For an at-the-money option (S = K), as T approaches 0: d1 = (ln(S/K) + (r + sigma^2/2)T) / (sigma * sqrt(T)) approaches 0 since ln(S/K) = 0. N(d1) approaches N(0) = 0.5. Economically: with zero time remaining, an at-the-money option has a 50% probability of expiring in-the-money.",
      hints: [
        "For S = K (at-the-money): d1 = (r + sigma^2/2) * sqrt(T) / sigma, which approaches 0 as T approaches 0.",
        "N(0) = 0.5 exactly. Delta for ATM short-dated options converges to 0.5.",
      ],
    },
    {
      id: "q-fin-kp39-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Neural networks trained to estimate option Greeks (delta, gamma, vega) can produce more accurate Greeks than finite-difference estimation from noisy market prices, because the network learns a smooth function of inputs and analytical differentiation via autograd avoids numerical differentiation noise.",
      correctAnswer: "True",
      explanation:
        "Market price-based finite differences amplify noise: (V(S+h) - V(S-h)) divided by 2h is noisy because market prices include bid-ask spread and microstructure noise. A neural network trained on option prices learns a smooth surface; automatic differentiation through the network gives analytical Greeks of the fitted surface, avoiding numerical differentiation noise.",
      hints: [
        "Finite difference delta from noisy prices amplifies noise: dividing a small price difference by a small h.",
        "Neural network Greeks: fit a smooth surface V_theta, then compute the partial derivative analytically via autograd.",
      ],
    },
    {
      id: "q-fin-kp39-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A neural network volatility surface model interpolates implied volatility across strikes and maturities. What arbitrage constraint must the fitted surface satisfy, and how is it typically enforced in neural network architectures?",
      options: [
        "The surface must be constant across all strikes — a flat surface is arbitrage-free",
        "The surface must satisfy butterfly and calendar spread no-arbitrage conditions: implied total variance must be non-decreasing in maturity and the local volatility derived from the surface must be non-negative. These are enforced via penalty terms in the loss or by constraining the network to be monotone in maturity and convex in strike",
        "No arbitrage constraints are needed — neural networks automatically learn arbitrage-free surfaces from market data",
        "The surface must be arbitrage-free only at strikes within one standard deviation of the current spot price",
      ],
      correctAnswer: 1,
      explanation:
        "Arbitrage conditions: (1) Calendar spread no-arb: total implied variance w(k,T) = sigma_impl^2 * T must be non-decreasing in T for each strike k. (2) Butterfly no-arb: the local volatility derived via Dupire's formula must be non-negative everywhere. These conditions are enforced via penalty terms or monotone and convex network architectures in arbitrage-free neural vol surface models.",
      hints: [
        "Calendar spread: selling a near-dated option and buying a far-dated option of same strike should not give free money — requires w non-decreasing in T.",
        "Butterfly no-arb: the call price surface must be convex in strike — enforced via non-negative second derivative penalties.",
      ],
    },
  ],

  // ── fin-kp-40: ML Backtesting ─────────────────────────────────────────────
  "ml-backtesting": [
    {
      id: "q-fin-kp40-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Walk-forward validation is preferred over standard k-fold cross-validation for backtesting financial ML models. What is the key reason?",
      options: [
        "Walk-forward validation uses more data, giving lower variance estimates of model performance",
        "Walk-forward validation respects the temporal ordering of data: the model is always trained on past data and tested on future data, preventing future information from contaminating training — unlike k-fold which randomly mixes past and future observations",
        "Walk-forward validation is computationally faster because it reuses the same trained model across all test folds",
        "Walk-forward validation automatically handles non-stationarity by using shorter training windows",
      ],
      correctAnswer: 1,
      explanation:
        "Standard k-fold randomly shuffles observations into folds, so training data can include future observations relative to test data. For financial time series, this introduces look-ahead bias: the model effectively sees future information during training. Walk-forward validation maintains strict temporal ordering: train on past, test on future, maintaining realistic evaluation conditions.",
      hints: [
        "K-fold shuffling: a training fold may contain 2022 observations while a test fold contains 2020 data — look-ahead bias.",
        "Walk-forward: at each step, training data is always earlier than test data — no future information contaminates training.",
      ],
    },
    {
      id: "q-fin-kp40-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Look-ahead bias in financial backtesting occurs when a strategy uses information at time t that was not actually available until time t+k, such as using end-of-day closing prices to determine trades that are placed at the start of that same day's trading session.",
      correctAnswer: "True",
      explanation:
        "Look-ahead bias is a pervasive backtesting error: (1) using closing price to generate a signal, then assuming the position was entered at that same closing price; (2) using financial data reported with delay (earnings announced after close, used as if available at open); (3) using survivor-biased index constituents. Each form makes the backtest appear better than live trading.",
      hints: [
        "Classic look-ahead: use today's close price to generate signal, assume filled at today's close. In reality, signal can only be acted on at tomorrow's open.",
        "Delayed reporting bias: Q4 earnings are often published in February; using them as available in December creates look-ahead bias.",
      ],
    },
    {
      id: "q-fin-kp40-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A backtested equity strategy shows a gross Sharpe ratio of 2.5 before transaction costs. With two-way turnover of 200% per year and assumed transaction costs of 10 basis points per trade, what is the approximate net impact and how should it be estimated?",
      options: [
        "Transaction costs have no impact because 10 bps per trade is negligibly small",
        "Cost drag equals 200% turnover times 10 bps = 200 bps = 2% per year in return drag; if gross annualized return was 20% with 8% volatility, net return becomes 18% and net Sharpe falls to 2.25 — a meaningful but manageable reduction that must be validated with realistic cost assumptions",
        "Net Sharpe cannot be estimated without knowing the exact order sizes and market impact",
        "200% turnover means the entire portfolio is turned over twice, so all positions incur infinite transaction costs",
      ],
      correctAnswer: 1,
      explanation:
        "Transaction cost modeling: two-way turnover of 200% times 10 bps one-way cost = 200 bps = 2% return drag per year. If gross Sharpe = 2.5 with 20% return and 8% vol: net return = 18%, net Sharpe = 18/8 = 2.25. Market impact (price impact from large orders) must also be modeled separately — for high-capacity strategies, market impact often dominates fixed transaction costs.",
      hints: [
        "Cost drag = annual turnover (two-way) times cost per unit of turnover. Keep units consistent in percent.",
        "Market impact adds to transaction cost beyond the bid-ask spread — larger orders move prices adversely.",
      ],
    },
  ],
});

export default questions;
