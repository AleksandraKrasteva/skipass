package com.skipass.statisticsservice.business;

import com.skipass.statisticsservice.domain.AggregatedJourneyStatistics;
import com.skipass.statisticsservice.domain.AggregatedPostStatistics;
import com.skipass.statisticsservice.domain.JourneyStatistic;

import java.util.List;

public interface StatisticsService {
    AggregatedJourneyStatistics getJourneyStatisticsOverview();
    AggregatedPostStatistics getPostStatisticsOverview();
    List<AggregatedJourneyStatistics> getJourneyStatisticsForPastWeek();
    List<AggregatedJourneyStatistics> getJourneyStatisticsForPastMonth();
    List<AggregatedJourneyStatistics> getJourneyStatisticsForPastDay();




}
