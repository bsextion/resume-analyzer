interface ScoreBadgeProps {
    score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    let badgeColor = '';
    let badgeText = '';

    if (score == 100) {
        badgeColor = 'bg-badge-green text-green-600';
        badgeText = '✨Perfect✨';
    }
    if (score >= 80) {
        badgeColor = 'bg-badge-green text-green-600';
        badgeText = 'Strong';
    } else if (score >= 60) {
        badgeColor = 'bg-badge-yellow text-yellow-600';
        badgeText = 'Needs Work';
    } else {
        badgeColor = 'bg-badge-red text-red-600';
        badgeText = 'Needs Significant Work';
    }

    return (
        <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
            <p className="text-sm font-medium">{badgeText}</p>
        </div>
    );
};

export default ScoreBadge;