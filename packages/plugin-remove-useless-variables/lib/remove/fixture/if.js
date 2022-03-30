let linkProps = {};
let linkLabel = '';

if (billPayLink) {
    linkProps = billPayLink;
    linkLabel = 'Bill Pay Inquiry';
} else if (pharmacyLink) {
    linkProps = pharmacyLink;
    linkLabel = 'Pharmacy Benefits';
}

const {
    actionUrl,
    birthDate,
    cardId,
    number,
    destinationUrl,
    injuredDate,
    userType,
    programCode,
} = linkProps;

f(
    actionUrl,
    birthDate,
    cardId,
    number,
    destinationUrl,
    injuredDate,
    userType,
    programCode,
);
