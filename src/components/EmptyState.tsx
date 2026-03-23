"use client";

import { Button } from "./ui/Button";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Empty state component for onboarding users to empty sections
 * Provides clear guidance and actionable next steps
 *
 * Use cases:
 * - No items in list (first-time users)
 * - No search results
 * - No data to display
 * - Feature not yet used
 */
export function EmptyState({
  icon = "📭",
  title,
  description,
  action,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" role="img" aria-hidden="true">
        {icon}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      <div className="empty-state-action flex flex-col sm:flex-row gap-3">
        {action && (
          <Button variant="primary" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
        {secondaryAction && (
          <Button variant="secondary" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}

// Pre-built empty states for common use cases
export function NoCoursesState({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon="📚"
      title="No courses yet"
      description="Start your learning journey by exploring our course catalog."
      action={onCreate ? { label: "Browse courses", onClick: onCreate } : undefined}
    />
  );
}

export function NoProgressState({ onContinue }: { onContinue?: () => void }) {
  return (
    <EmptyState
      icon="🎯"
      title="Start your first lesson"
      description="Pick a topic that interests you and begin learning. Track your progress as you go."
      action={onContinue ? { label: "Continue learning", onClick: onContinue } : undefined}
    />
  );
}

export function NoSearchResultsState({
  query,
  onClear,
}: {
  query: string;
  onClear?: () => void;
}) {
  return (
    <EmptyState
      icon="🔍"
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try different keywords or check your spelling.`}
      action={onClear ? { label: "Clear search", onClick: onClear } : undefined}
    />
  );
}

export function NoNotificationsState() {
  return (
    <EmptyState
      icon="🔔"
      title="All caught up!"
      description="You have no new notifications. We'll let you know when there's something new."
    />
  );
}

export function NoAchievementsState() {
  return (
    <EmptyState
      icon="🏆"
      title="No achievements yet"
      description="Complete lessons and solve problems to earn your first achievement!"
    />
  );
}
