import hospitalData from "@/data/data.json";

export function getInformationsFromJson(query: string): string {
  const queryLower = query.toLowerCase().trim();
  const relevantInfo: string[] = [];

  // departments
  if (queryLower.includes("department") || queryLower.includes("specialties")) {
    relevantInfo.push(
      `## Available Departments\n${hospitalData.departments
        .map((dept) => `- ${dept}`)
        .join("\n")}`
    );
  }

  // services
  if (queryLower.includes("service") || queryLower.includes("facilities")) {
    relevantInfo.push(
      `## Our Services\n${hospitalData.services
        .map((service) => `- ${service}`)
        .join("\n")}`
    );
  }

  // visiting hours
  if (queryLower.includes("visiting") || queryLower.includes("hours")) {
    const { general_wards, icu } = hospitalData.visiting_hours;
    relevantInfo.push(`## Visiting Hours

### General Wards
- Morning: ${general_wards.morning}
- Afternoon: ${general_wards.afternoon}
- Evening: ${general_wards.evening}

### ICU
- Morning: ${icu.morning}
- Evening: ${icu.evening}

> Note: Please strictly adhere to these timings for the wellbeing of our patients.`);
  }

  // doctor schedules
  if (queryLower.includes("doctor") || queryLower.includes("appointment")) {
    const doctorInfo = hospitalData.doctorSchedules.map(
      (doc) =>
        `### Dr. ${doc.name} - ${doc.specialty}
- Schedule: ${doc.schedule.map((s) => `${s.day} (${s.time})`).join(", ")}
- Consultation Fee: ${doc.consultationFee.amount} ${
          doc.consultationFee.currency
        }`
    );
    relevantInfo.push(`## Available Doctors\n\n${doctorInfo.join("\n\n")}`);
  }

  // health packages
  if (queryLower.includes("package") || queryLower.includes("checkup")) {
    const packageInfo = hospitalData.healthCheckPackages.map(
      (pkg) =>
        `### ${pkg.name}
- ${pkg.description}
- Price: ${pkg.price.amount} ${pkg.price.currency}
- Included Tests:
${pkg.includedTests.map((test) => `  - ${test}`).join("\n")}`
    );
    relevantInfo.push(
      `## Health Check Packages\n\n${packageInfo.join("\n\n")}`
    );
  }

  // contact information
  if (
    queryLower.includes("contact") ||
    queryLower.includes("location") ||
    queryLower.includes("address")
  ) {
    const contact = hospitalData.contact;
    relevantInfo.push(`## Contact Information
- Address: ${contact.address}
- Phone Numbers:
  - General: ${contact.phone.general}
  - Emergency: ${contact.phone.emergency}
  - Appointments: ${contact.phone.appointments}
- Email: ${contact.email}
- Website: ${contact.website}`);
  }

  // wellness programs
  if (queryLower.includes("wellness") || queryLower.includes("program")) {
    relevantInfo.push(
      `## Wellness Programs\n${hospitalData.wellnessPrograms
        .map((program) => `- ${program}`)
        .join("\n")}`
    );
  }

  return relevantInfo.length > 0
    ? relevantInfo.join("\n\n")
    : "I apologize, but I couldn't find specific information about that query. How else may I assist you?";
}
